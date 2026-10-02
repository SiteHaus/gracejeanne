import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/ecom/client";
import type { CollectionSummary } from "@/lib/ecom/types";
import { GalleryCard } from "@/components/shared/gallery-card";

export const dynamic = "force-dynamic";

async function loadGalleries(): Promise<CollectionSummary[]> {
  try {
    const { collections } = await getCollections();
    return collections;
  } catch {
    return [];
  }
}

export default async function Home() {
  const galleries = await loadGalleries();

  return (
    <div className="w-full">
      {/* ── Hero: one large image, framed like a print on the wall ── */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-6 md:pt-10">
        <div className="relative aspect-[4/5] sm:aspect-[16/10] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
          <Image
            src="/landing.jpg"
            alt="Sunset over snow-dusted peaks above a winding mountain road"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1152px"
          />
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center flex flex-col items-center gap-6">
        <h1 className="text-2xl md:text-3xl leading-snug">
          Landscapes from the American Southwest and beyond
        </h1>
        <p className="text-base md:text-lg leading-relaxed text-foreground/80">
          Welcome to the gallery of Grace Jeanne. Every photograph here is
          available as a fine art print, made to bring the quiet of wild places
          into your home or business.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/galleries"
            className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-7 py-3 text-xs uppercase tracking-[0.22em] transition-colors"
          >
            View Galleries
          </Link>
          <Link
            href="/shop"
            className="border border-white/25 text-white/85 hover:border-white hover:text-white px-7 py-3 text-xs uppercase tracking-[0.22em] transition-colors"
          >
            Shop Prints
          </Link>
        </div>
      </section>

      {/* ── Galleries ── */}
      {galleries.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 md:px-6 pb-24">
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
            {galleries.map((gallery) => (
              <GalleryCard key={gallery.id} gallery={gallery} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
