import type { Metadata } from "next";
import { getCollections } from "@/lib/ecom/client";
import type { CollectionSummary } from "@/lib/ecom/types";
import { GalleryCard } from "@/components/shared/gallery-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galleries",
  description:
    "Photo galleries and collections captured by Grace Jeanne in Southern Utah.",
  alternates: {
    canonical: "https://gracejeanne.com/galleries",
  },
  openGraph: {
    title: "Galleries | Grace Jeanne",
    description: "Browse photo galleries from Grace Jeanne.",
    url: "https://gracejeanne.com/galleries",
  },
};

async function loadGalleries(): Promise<CollectionSummary[]> {
  try {
    const { collections } = await getCollections();
    return collections;
  } catch {
    return [];
  }
}

export default async function GalleriesPage() {
  const galleries = await loadGalleries();

  return (
    <div className="w-full">
      <header className="max-w-3xl mx-auto px-6 pt-14 pb-14 md:pt-20 md:pb-20 text-center">
        <h1 className="text-3xl md:text-4xl">Galleries</h1>
      </header>

      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-24">
        {galleries.length === 0 ? (
          <p className="text-center py-24 text-muted-foreground">
            No galleries yet
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
            {galleries.map((gallery) => (
              <GalleryCard key={gallery.id} gallery={gallery} showDescription />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
