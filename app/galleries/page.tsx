import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/ecom/client";
import type { CollectionSummary } from "@/lib/ecom/types";

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
      {/* ── Hero ── */}
      <section className="bg-hero-bg py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-background">
            Galleries
          </h1>
        </div>
      </section>

      {/* ── Gallery list ── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {galleries.length === 0 ? (
            <p className="text-center py-24 text-gray-400 text-lg font-semibold">
              No galleries yet
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleries.map((gallery) => (
                <Link
                  key={gallery.id}
                  href={`/galleries/${gallery.slug}`}
                  className="group flex flex-col gap-4"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                    {gallery.coverImageUrl && (
                      <Image
                        src={gallery.coverImageUrl}
                        alt={gallery.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {gallery.name}
                    </h2>
                    {gallery.description && (
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {gallery.description}
                      </p>
                    )}
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                      {gallery.productCount}{" "}
                      {gallery.productCount === 1 ? "photo" : "photos"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
