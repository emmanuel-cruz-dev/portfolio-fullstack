import { setRequestLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";

async function AuthPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  redirect({
    href: "/auth/login",
    locale,
  });
}

export default AuthPage;
