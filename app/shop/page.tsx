import { getProducts } from "@/lib/ecom/client";
import { getGalleriesByProduct } from "@/lib/ecom/galleries";
import ShopClient from "./ShopClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Photo Shop | Grace Jeanne",
  description:
    "Photos captured and trusted by our photography — formulated for quality.",
};

export default async function ShopPage() {
  const [{ items }, galleriesByProduct] = await Promise.all([
    getProducts({ limit: 100 }),
    getGalleriesByProduct(),
  ]);

  return (
    <ShopClient products={items} galleriesByProduct={galleriesByProduct} />
  );
}
