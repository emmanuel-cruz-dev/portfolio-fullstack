import { setRequestLocale } from "next-intl/server";

import { ContactClient } from "@/features/contact";
import { getPageMetadata } from "@/lib";

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
