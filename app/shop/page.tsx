import { getProducts } from "@/lib/ecom/client";
import ShopClient from "./ShopClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Photo Shop | Grace Jeanne",
  description:
    "Photos captured and trusted by our photography — formulated for quality.",
};

export default async function ShopPage() {
  const { items } = await getProducts({ limit: 100 });

  return <ShopClient products={items} />;
}
