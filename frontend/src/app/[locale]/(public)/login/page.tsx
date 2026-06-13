import { LoginForm } from "@/features/auth/components/LoginForm";
import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "loginPage",
  });
}

function LoginPage() {
  return (
    <section className="py-16 flex items-center justify-center">
      <LoginForm />
    </section>
  );
}

export default LoginPage;
