import Image from "next/image";

import { OrbitingCircles } from "@/components/ui";
import { INNER_STACK, OUTER_STACK } from "@/constants";

export function OrbitingItem() {
  const renderIcons = (
    stack: {
      src: string;
      alt: string;
    }[]
  ) =>
    stack.map((icon) => (
      <Image
        key={icon.alt}
        src={icon.src}
        alt={icon.alt}
        width={32}
        height={32}
        className="size-8"
      />
    ));
  return (
    <article className="relative flex items-center justify-center h-100 w-full overflow-hidden">
      <OrbitingCircles>{renderIcons(INNER_STACK)}</OrbitingCircles>
      <OrbitingCircles radius={100} reverse>
        {renderIcons(OUTER_STACK)}
      </OrbitingCircles>
    </article>
  );
}
