import Image from "next/image";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";

function HeroHome() {
  return (
    <section className="grid grid-cols-2 gap-4">
      <div></div>
      <div className="relative flex items-center justify-center h-125 w-full overflow-hidden">
        <OrbitingCircles>
          <Image src="/icons/nextjs.png" alt="Next.js" width={32} height={32} />
          <Image src="/icons/react.png" alt="React" width={32} height={32} />
          <Image
            src="/icons/angular.png"
            alt="Angular"
            width={32}
            height={32}
          />

          <Image
            src="/icons/fastapi.png"
            alt="FastAPI"
            width={32}
            height={32}
          />
          <Image
            src="/icons/spring-boot.png"
            alt="Spring Boot"
            width={32}
            height={32}
          />
          <Image
            src="/icons/tailwind.png"
            alt="Tailwind"
            width={32}
            height={32}
          />
          <Image src="/icons/sass.png" alt="Sass" width={32} height={32} />
        </OrbitingCircles>
        <OrbitingCircles radius={100} reverse>
          <Image src="/icons/css.png" alt="CSS" width={32} height={32} />
          <Image src="/icons/html.png" alt="HTML" width={32} height={32} />
          <Image
            src="/icons/javascript.png"
            alt="JavaScript"
            width={32}
            height={32}
          />
          <Image src="/icons/python.png" alt="Python" width={32} height={32} />
          <Image src="/icons/java.png" alt="Java" width={32} height={32} />

          <Image
            src="/icons/typescript.png"
            alt="TypeScript"
            width={32}
            height={32}
          />
        </OrbitingCircles>
      </div>
    </section>
  );
}

export default HeroHome;
