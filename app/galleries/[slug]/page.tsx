import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCollection } from "@/lib/ecom/client";
import GalleryCarousel from "./GalleryCarousel";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const gallery = await getCollection(slug);
    const cover = gallery.products.find((p) => p.primaryImage)?.primaryImage;
    return {
      title: `${gallery.name} | Galleries`,
      description:
        gallery.description ??
        `${gallery.name} — a photo gallery by Grace Jeanne.`,
      alternates: {
        canonical: `https://gracejeanne.com/galleries/${gallery.slug}`,
      },
      openGraph: {
        title: gallery.name,
        description: gallery.description ?? undefined,
        images: cover ? [{ url: cover.cdnUrl }] : [],
      },
    };
  } catch {
    return { title: "Gallery | Grace Jeanne" };
  }
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;
  let gallery;
  try {
    gallery = await getCollection(slug);
  } catch {
    notFound();
  }

  // Only send what the carousel shows — no variants/prices.
  const photos = gallery.products.map(
    ({ id, name, description, primaryImage }) => ({
      id,
      name,
      description,
      primaryImage,
    }),
  );

  return (
    <div className="w-full">
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-12 md:pt-14 md:pb-16 text-center flex flex-col items-center gap-6">
        <Link
          href="/galleries"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> All galleries
        </Link>
        <h1 className="text-3xl md:text-4xl">{gallery.name}</h1>
        {gallery.description && (
          <p className="text-base md:text-lg leading-relaxed text-foreground/80 whitespace-pre-line">
            {gallery.description}
          </p>
        )}
      </header>

      <section className="max-w-6xl mx-auto px-4 md:px-14 pb-24">
        {photos.length === 0 ? (
          <p className="text-center py-24 text-muted-foreground">
            No photos in this gallery yet
          </p>
        ) : (
          <GalleryCarousel label={gallery.name} photos={photos} />
        )}
      </section>
    </div>
  );
}
