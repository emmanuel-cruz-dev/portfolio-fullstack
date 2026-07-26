import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";

async function UserDetails({ locale }: { locale: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect({
      href: "/auth/login",
      locale,
    });
  }

  return JSON.stringify(data!.claims, null, 2);
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>User details:</p>
      <Suspense fallback={<p>Loading...</p>}>
        <UserDetails locale={locale} />
      </Suspense>
      {children}
    </div>
  );
}
