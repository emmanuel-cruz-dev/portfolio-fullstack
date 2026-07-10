import { getPageMetadata } from "@/lib/utils/metadata";
import { ContactClient } from "@/features/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getPageMetadata({ locale, namespace: "contactPage" });
}

function ContactPage() {
  return <ContactClient />;
}

export default ContactPage;
