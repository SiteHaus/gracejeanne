import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CATALOG_CACHE_TAG } from "@/lib/ecom/cache-tags";
import {
  parseSiteHausWebhook,
  verifySiteHausSignature,
  type SiteHausWebhook,
} from "@/lib/webhooks";

// node:crypto is needed for HMAC verification, and webhooks must never be cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Receives webhooks from the SiteHaus commerce dashboard.
 * Register https://<your-domain>/api/webhooks under Commerce → Webhooks,
 * then set SITEHAUS_WEBHOOK_SECRET to the signing secret it shows you.
 */
export async function POST(request: Request) {
  const secret = process.env.SITEHAUS_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhooks] SITEHAUS_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook receiver not configured" },
      { status: 500 },
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-sitehaus-signature");

  if (!verifySiteHausSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const webhook = parseSiteHausWebhook(json);
  if (!webhook) {
    // Signed by SiteHaus but not an event we handle (e.g. a newly added type).
    // Acknowledge it so SiteHaus doesn't keep retrying.
    const event = (json as { event?: unknown })?.event;
    console.warn(`[webhooks] Ignoring unhandled event: ${String(event)}`);
    return NextResponse.json({ received: true, ignored: true });
  }

  try {
    await handleEvent(webhook);
  } catch (err) {
    console.error(`[webhooks] Handler for ${webhook.event} failed`, err);
    // A non-2xx response makes SiteHaus retry (up to 5 attempts with backoff).
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

/** Expires the cached shop data so the next page load fetches fresh stock. */
function refreshCatalog(reason: string) {
  // { expire: 0 } expires the cache immediately. The default "max" profile
  // would keep serving the old stock to one more visitor.
  revalidateTag(CATALOG_CACHE_TAG, { expire: 0 });
  console.log(`[webhooks] Refreshed shop cache (${reason})`);
}

async function handleEvent(webhook: SiteHausWebhook) {
  // SiteHaus may deliver the same event more than once (retries), so keep
  // these handlers idempotent. Refreshing the cache twice is harmless.
  switch (webhook.event) {
    case "order.confirmed":
      // A sale reduces stock, which can change "sold out" on the shop.
      console.log(`[webhooks] Order ${webhook.data.orderId} confirmed`);
      refreshCatalog(webhook.event);
      break;
    case "order.shipped":
      console.log(
        `[webhooks] Order ${webhook.data.orderId} shipped` +
          (webhook.data.trackingNumber
            ? ` (tracking ${webhook.data.trackingNumber})`
            : ""),
      );
      break;
    case "order.delivered":
      console.log(`[webhooks] Order ${webhook.data.orderId} delivered`);
      break;
    case "order.refunded":
      // A refund can put items back in stock.
      console.log(`[webhooks] Order ${webhook.data.orderId} refunded`);
      refreshCatalog(webhook.event);
      break;
    case "inventory.low":
      // Sent when stock is edited in the dashboard and ends up at or below
      // the low-stock threshold.
      console.log(
        `[webhooks] Variant ${webhook.data.variantId} is low on stock (${webhook.data.available} available)`,
      );
      refreshCatalog(webhook.event);
      break;
    case "product.published":
      console.log(
        `[webhooks] Product "${webhook.data.name}" (${webhook.data.productId}) published`,
      );
      refreshCatalog(webhook.event);
      break;
  }
}
