import { setRequestLocale } from "next-intl/server";

import { LoginForm } from "@/features/auth";
import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "auth.login",
  });
}

async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="py-16 flex items-center justify-center">
      <LoginForm />
    </section>
  );
}

export default LoginPage;
