import type { Metadata } from "next";

import { LoginForm } from "@/components/ui/LoginForm";

export const metadata: Metadata = {
  title: "Iniciar sesión | Emmanuel Cruz",
  description: "Inicia sesión en tu cuenta",
};

function LoginPage() {
  return (
    <section className="py-16 flex items-center justify-center">
      <LoginForm />
    </section>
  );
}

export default LoginPage;
