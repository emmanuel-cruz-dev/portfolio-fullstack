import { getPageMetadata } from "@/lib/utils/metadata";
import { ContactForm } from "@/components";

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
    <section>
      <ContactForm />
    </section>
  );
}

export default ContactPage;
