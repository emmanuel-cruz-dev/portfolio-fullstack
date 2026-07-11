async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <h1>{slug}</h1>;
}

export default ExperiencePage;
