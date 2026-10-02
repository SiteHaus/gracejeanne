import type {
  Cart,
  CheckoutIntentRequest,
  CheckoutIntentResponse,
  CollectionDetail,
  CollectionList,
  Order,
  ProductDetail,
  ProductList,
} from "./types";
import { CATALOG_CACHE_TAG } from "./cache-tags";

const DIRECT_API_URL = process.env.NEXT_PUBLIC_ECOM_API_URL;
const STORE_SLUG = process.env.NEXT_PUBLIC_STORE_SLUG;

if (!DIRECT_API_URL) {
  throw new Error(
    "NEXT_PUBLIC_ECOM_API_URL is not set. " +
      "Add it to .env.local for local dev or to your Vercel project environment variables.",
  );
}

// In the browser, route through the Next.js proxy (/api/ecom) so the store_session
// cookie is first-party on the storefront domain. iOS Safari's ITP blocks cross-site
// cookies regardless of SameSite=None, which breaks cart/checkout on mobile.
const API_URL =
  typeof window === "undefined"
    ? DIRECT_API_URL // SSR / RSC: call commerce API directly
    : "/api/ecom"; // Browser: same-origin proxy avoids ITP cookie blocking

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

async function ecomFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL!}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(STORE_SLUG ? { "x-store-slug": STORE_SLUG } : {}),
      ...init.headers,
    },
    credentials: "include",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(body?.message ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(params?: {
  limit?: number;
  offset?: number;
}): Promise<ProductList> {
  const query = new URLSearchParams();
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.offset) query.set("offset", String(params.offset));
  const qs = query.size ? `?${query}` : "";
  return ecomFetch<ProductList>(`/v1/catalog/products${qs}`, {
    next: { revalidate: 60, tags: [CATALOG_CACHE_TAG] },
  });
}

export async function getProduct(id: string): Promise<ProductDetail> {
  return ecomFetch<ProductDetail>(`/v1/catalog/products/${id}`, {
    next: { revalidate: 60, tags: [CATALOG_CACHE_TAG] },
  });
}

// ─── Collections ──────────────────────────────────────────────────────────────

export async function getCollections(): Promise<CollectionList> {
  return ecomFetch<CollectionList>("/v1/catalog/collections", {
    next: { revalidate: 60, tags: [CATALOG_CACHE_TAG] },
  });
}

export async function getCollection(slug: string): Promise<CollectionDetail> {
  return ecomFetch<CollectionDetail>(
    `/v1/catalog/collections/${encodeURIComponent(slug)}`,
    { next: { revalidate: 60, tags: [CATALOG_CACHE_TAG] } },
  );
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function getCart(): Promise<Cart> {
  return ecomFetch<Cart>("/v1/cart");
}

export async function addToCart(
  variantId: string,
  quantity = 1,
): Promise<Cart> {
  return ecomFetch<Cart>("/v1/cart/items", {
    method: "POST",
    body: JSON.stringify({ variantId, quantity }),
  });
}

export async function updateCartItem(
  variantId: string,
  quantity: number,
): Promise<Cart> {
  return ecomFetch<Cart>(`/v1/cart/items/${variantId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });
}

export async function removeCartItem(variantId: string): Promise<Cart> {
  return ecomFetch<Cart>(`/v1/cart/items/${variantId}`, {
    method: "DELETE",
  });
}

// ─── Checkout ─────────────────────────────────────────────────────────────────

export async function createCheckoutIntent(
  data: CheckoutIntentRequest,
): Promise<CheckoutIntentResponse> {
  return ecomFetch<CheckoutIntentResponse>("/v1/checkout/intent", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function getOrder(
  orderId: string,
  email?: string,
): Promise<Order> {
  const qs = email ? `?email=${encodeURIComponent(email)}` : "";
  return ecomFetch<Order>(`/v1/orders/${orderId}${qs}`);
}
