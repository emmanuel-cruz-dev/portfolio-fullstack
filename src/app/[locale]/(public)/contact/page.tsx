import { setRequestLocale } from "next-intl/server";

import { getPageMetadata } from "@/lib/utils/metadata";
import { ContactClient } from "@/features/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getPageMetadata({ locale, namespace: "contact" });
}

async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactClient />;
}

export default ContactPage;
