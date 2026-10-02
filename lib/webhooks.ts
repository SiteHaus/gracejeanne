import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verifies a SiteHaus webhook signature.
 *
 * SiteHaus signs the raw request body with HMAC-SHA256 using the endpoint's
 * signing secret and sends it as `X-SiteHaus-Signature: sha256=<hex>`.
 * Always verify against the raw body text, never a re-serialized object.
 */
export function verifySiteHausSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): boolean {
  if (!signatureHeader?.startsWith("sha256=")) return false;

  const expected = createHmac("sha256", secret).update(rawBody).digest();
  const received = Buffer.from(signatureHeader.slice("sha256=".length), "hex");

  // timingSafeEqual throws on length mismatch, so check first.
  return received.length === expected.length && timingSafeEqual(received, expected);
}

type Envelope<E extends string, D> = {
  event: E;
  storeId: string;
  timestamp: string;
  data: D;
};

/**
 * Events the SiteHaus commerce API currently sends. (return.* can be selected
 * in the dashboard but is not dispatched by the API yet.)
 */
export type SiteHausWebhook =
  | Envelope<"order.confirmed", { orderId: string }>
  | Envelope<"order.shipped", { orderId: string; trackingNumber?: string | null }>
  | Envelope<"order.delivered", { orderId: string }>
  | Envelope<"order.refunded", { orderId: string }>
  | Envelope<
      "inventory.low",
      { variantId: string; stock: number; reserved: number; available: number }
    >
  | Envelope<"product.published", { productId: string; name: string }>;

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** Returns the payload as a typed event if it is one we handle, otherwise null. */
export function parseSiteHausWebhook(payload: unknown): SiteHausWebhook | null {
  if (!isObject(payload) || !isObject(payload.data)) return null;
  if (typeof payload.storeId !== "string" || typeof payload.timestamp !== "string") return null;

  const data = payload.data;
  switch (payload.event) {
    case "order.confirmed":
    case "order.delivered":
    case "order.refunded":
      return typeof data.orderId === "string" ? (payload as SiteHausWebhook) : null;
    case "order.shipped":
      return typeof data.orderId === "string" &&
        (data.trackingNumber == null || typeof data.trackingNumber === "string")
        ? (payload as SiteHausWebhook)
        : null;
    case "inventory.low":
      return typeof data.variantId === "string" &&
        typeof data.stock === "number" &&
        typeof data.reserved === "number" &&
        typeof data.available === "number"
        ? (payload as SiteHausWebhook)
        : null;
    case "product.published":
      return typeof data.productId === "string" && typeof data.name === "string"
        ? (payload as SiteHausWebhook)
        : null;
    default:
      return null;
  }
}
