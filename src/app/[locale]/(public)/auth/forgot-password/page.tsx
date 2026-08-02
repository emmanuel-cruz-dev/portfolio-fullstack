import { setRequestLocale } from "next-intl/server";

async function ForgotPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="py-16 flex items-center justify-center">
      <p>ForgotPasswordPage</p>
    </section>
  );
}

export default ForgotPasswordPage;
