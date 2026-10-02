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
            className="basis-4/5 sm:basis-1/2 lg:basis-1/3"
          >
            <figure className="flex flex-col gap-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                {photo.primaryImage && (
                  <Image
                    src={photo.primaryImage.cdnUrl}
                    alt={photo.primaryImage.altText ?? photo.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
              </div>
              <figcaption className="text-sm font-medium text-gray-700">
                {photo.name}
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Arrows sit inside the edges on small screens, outside from lg up */}
      <CarouselPrevious className="left-2 top-[40%] lg:-left-12 lg:top-1/2 bg-white/90" />
      <CarouselNext className="right-2 top-[40%] lg:-right-12 lg:top-1/2 bg-white/90" />
    </Carousel>
  );
}
