import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Photographs and collections captured by Grace Jeanne, located in Southern Utah.",
  alternates: {
    canonical: "https://gracejeanne.com/shop",
  },
  openGraph: {
    title: "Shop | Grace Jeanne",
    description:
      "Browse photographer-recommended photos and collections from Grace Jeanne",
    url: "https://gracejeanne.com/shop",
  },
};

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="mx-auto">{children}</div>;
}
