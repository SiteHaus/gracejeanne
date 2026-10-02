import { getCollection, getCollections } from "./client";

export type GalleryTag = {
  name: string;
  slug: string;
};

/**
 * Maps each product id to the galleries (collections) it belongs to.
 *
 * The products endpoint doesn't say which collections a product is in, so this
 * reads every public collection and inverts it. Never throws: if collections
 * can't be loaded, products simply show no gallery chip.
 */
export async function getGalleriesByProduct(): Promise<
  Record<string, GalleryTag[]>
> {
  const byProduct: Record<string, GalleryTag[]> = {};

  let collections;
  try {
    ({ collections } = await getCollections());
  } catch {
    return byProduct;
  }

  const details = await Promise.all(
    collections.map((c) => getCollection(c.slug).catch(() => null)),
  );

  // Keep collection sort order so a product in several galleries lists them
  // in the same order as the Galleries page.
  for (const detail of details) {
    if (!detail) continue;
    for (const product of detail.products) {
      (byProduct[product.id] ??= []).push({
        name: detail.name,
        slug: detail.slug,
      });
    }
  }

  return byProduct;
}
