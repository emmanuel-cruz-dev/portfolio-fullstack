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
      className="w-full"
    >
      <CarouselContent>{children}</CarouselContent>

      <>
        <CarouselPrevious className="left-2 md:-left-10 cursor-pointer z-10" />
        <CarouselNext className="right-2 md:-right-10 cursor-pointer z-10" />
      </>
    </Carousel>
  );
}
