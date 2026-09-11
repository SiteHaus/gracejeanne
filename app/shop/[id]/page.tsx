import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct } from "@/lib/ecom/client";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProduct(id);
    return {
      title: `${product.name} | Grace Jeanne Shop`,
      description:
        product.description ??
        `${product.name} — authentic photographs from Grace Jeanne.`,
      openGraph: {
        title: product.name,
        description: product.description ?? undefined,
        images: product.primaryImage
          ? [{ url: product.primaryImage.cdnUrl }]
          : [],
      },
    };
  } catch {
    return { title: "Product | Grace Jeanne Shop" };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  let product;
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
