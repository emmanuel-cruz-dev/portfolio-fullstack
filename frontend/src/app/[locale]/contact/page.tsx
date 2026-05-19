import { getPageMetadata } from "@/lib/utils/metadata";
import { ContactPageClient } from "@/components";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getPageMetadata({ locale, namespace: "contactPage" });
}

function ContactPage() {
  return <ContactPageClient />;
}

export default ContactPage;
