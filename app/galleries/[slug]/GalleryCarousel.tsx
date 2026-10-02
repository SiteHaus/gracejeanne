"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CollectionProduct } from "@/lib/ecom/types";

// Display-only: shows each photo in a collection. No prices, links or cart.
export default function GalleryCarousel({
  label,
  photos,
}: {
  label: string;
  photos: CollectionProduct[];
}) {
  return (
    <Carousel
      opts={{ align: "start", loop: photos.length > 3 }}
      aria-label={`${label} photos`}
      className="w-full"
    >
      <CarouselContent>
        {photos.map((photo) => (
          <CarouselItem
            key={photo.id}
            className="basis-[88%] md:basis-1/2"
          >
            <figure className="flex flex-col gap-4">
              <div className="relative aspect-[4/5] overflow-hidden bg-card shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
                {photo.primaryImage && (
                  <Image
                    src={photo.primaryImage.cdnUrl}
                    alt={photo.primaryImage.altText ?? photo.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 88vw, 50vw"
                  />
                )}
              </div>
              <figcaption className="font-display italic font-light text-sm text-center text-foreground/80">
                {photo.name}
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Arrows sit inside the edges on small screens, in the gutter from md up */}
      <CarouselPrevious className="left-2 top-[45%] md:-left-12 bg-black/50 border-white/20 text-white hover:bg-black/70 hover:text-white" />
      <CarouselNext className="right-2 top-[45%] md:-right-12 bg-black/50 border-white/20 text-white hover:bg-black/70 hover:text-white" />
    </Carousel>
  );
}
