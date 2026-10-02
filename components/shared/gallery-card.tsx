import Image from "next/image";
import Link from "next/link";
import type { CollectionSummary } from "@/lib/ecom/types";

/**
 * A gallery tile in the fine-art style: landscape image with a soft shadow,
 * serif title centered beneath. Used on the home page and /galleries.
 */
export const GalleryCard = ({
  gallery,
  showDescription = false,
}: {
  gallery: CollectionSummary;
  showDescription?: boolean;
}) => (
  <Link
    href={`/galleries/${gallery.slug}`}
    className="group flex flex-col gap-5"
  >
    <div className="relative aspect-[3/2] overflow-hidden bg-card shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
      {gallery.coverImageUrl ? (
        <Image
          src={gallery.coverImageUrl}
          alt={gallery.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.3em] text-white/20">
          {gallery.name}
        </div>
      )}
    </div>
    <div className="flex flex-col items-center gap-2 text-center px-4">
      <h2 className="text-lg md:text-xl group-hover:text-primary transition-colors">
        {gallery.name}
      </h2>
      {showDescription && gallery.description && (
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2 max-w-md">
          {gallery.description}
        </p>
      )}
    </div>
  </Link>
);
