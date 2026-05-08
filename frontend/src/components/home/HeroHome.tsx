import OrbitingItem from "./OrbitingItem";
import { SocialLinksItem } from "../shared";
import { AuroraText, ShimmerButton } from "@/components/ui";

function HeroHome() {
  return (
    <section className="py-6 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-14 items-center">
        <div className="flex flex-col justify-center gap-4 order-last md:order-first">
          <ShimmerButton className="flex gap-2 w-fit scale-75 origin-left select-none cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Disponible
          </ShimmerButton>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold">
            Hola! Soy Emmanuel
          </h1>
          <AuroraText className="text-3xl md:text-4xl xl:text-5xl font-bold">
            Desarrollador Fullstack
          </AuroraText>
          <p>
            Especializado en la creación de aplicaciones web modernas y de alto
            rendimiento. Creo productos digitales escalables con interfaces
            responsivas, arquitectura limpia y sistemas backend listos para
            producción.
          </p>
          <SocialLinksItem />
        </div>

        <OrbitingItem />
      </div>
    </section>
  );
}

export default HeroHome;
