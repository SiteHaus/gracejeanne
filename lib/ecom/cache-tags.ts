/**
 * Cache tag on every catalog fetch (products and collections) in ./client.ts.
 * The SiteHaus webhook route (app/api/webhooks) expires it when stock changes,
 * so the shop updates right away instead of waiting out the 60s revalidate.
 */
export const CATALOG_CACHE_TAG = "ecom-catalog";
