import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type CatchAllPageProps = {
  params: Promise<{ locale: string; rest: string[] }>;
};

export default function CatchAllPage({ params }: CatchAllPageProps) {
  return (
    <Suspense fallback={null}>
      <CatchAllContent params={params} />
    </Suspense>
  );
}

async function CatchAllContent({ params }: CatchAllPageProps): Promise<never> {
  const { locale } = await params;

  setRequestLocale(locale);

  notFound();
}
