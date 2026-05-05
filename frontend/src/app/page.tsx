import type { Metadata } from "next";

import HeroHome from "@/components/sections/HeroHome";

export const metadata: Metadata = {
  title: "Inicio | Emmanuel Cruz | Portfolio",
  description: "Emmanuel Cruz Full Stack Developer",
};

function HomePage() {
  return <HeroHome />;
}

export default HomePage;
