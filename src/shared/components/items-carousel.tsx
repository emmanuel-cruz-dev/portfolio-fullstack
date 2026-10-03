"use client";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components";

export function ItemsCarousel({ children }: { children: React.ReactNode }) {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      plugins={[Autoplay({ delay: 4000 })]}
      className="-mx-1"
    >
      <CarouselContent>{children}</CarouselContent>

      <>
        <CarouselPrevious className="left-2 cursor-pointer z-10" />
        <CarouselNext className="right-2 cursor-pointer z-10" />
      </>
    </Carousel>
  );
}
