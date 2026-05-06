import { LoginForm } from "@/components/login/LoginForm";
import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return getPageMetadata({
    locale: params.locale,
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
