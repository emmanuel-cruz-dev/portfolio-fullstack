import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "contactPage",
  });
}

function ContactPage() {
  return (
    <div>
      <h1>Contact</h1>
    </div>
  );
}

export default ContactPage;
