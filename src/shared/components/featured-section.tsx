import { ComponentType } from "react";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button, CarouselItem } from "@/components";
import { ItemsCarousel } from "./items-carousel";

interface FeaturedSectionProps<T extends { id: string | number }> {
  title: string;
  subtitle?: string;
  items: T[];
  CardComponent: ComponentType<{ item: T }>;
  href?: string;
  actionLabel?: string;
}

export function FeaturedSection<T extends { id: string | number }>({
  title,
  subtitle,
  items,
  CardComponent,
  href,
  actionLabel,
}: FeaturedSectionProps<T>) {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4 xl:px-0 bg-background">
      <div className="space-y-12">
        <header className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </header>

        <ItemsCarousel>
          {items.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="px-1 py-6">
                <CardComponent item={item} />
              </div>
            </CarouselItem>
          ))}
        </ItemsCarousel>

        {href && (
          <div className="text-center">
            <Link href={href}>
              <Button variant="outline" size="lg" className="cursor-pointer">
                {actionLabel} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
