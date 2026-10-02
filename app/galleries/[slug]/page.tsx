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
      {/* ── Hero ── */}
      <section className="bg-hero-bg py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <Link
            href="/galleries"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors w-fit"
          >
            <ArrowLeft size={14} /> All galleries
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-background">
            {gallery.name}
          </h1>
          {gallery.description && (
            <p className="max-w-2xl text-white/80 text-lg leading-relaxed whitespace-pre-line">
              {gallery.description}
            </p>
          )}
        </div>
      </section>

      {/* ── Photos ── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {photos.length === 0 ? (
            <p className="text-center py-24 text-gray-400 text-lg font-semibold">
              No photos in this gallery yet
            </p>
          ) : (
            <GalleryCarousel label={gallery.name} photos={photos} />
          )}
        </div>
      </section>
    </div>
  );
}
