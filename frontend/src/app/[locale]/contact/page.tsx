import { useTranslations } from "next-intl";

import { getPageMetadata } from "@/lib/utils/metadata";
import { ContactForm, ContactInformation } from "@/components";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "contactPage",
  });
}

function ContactPage() {
  const t = useTranslations("contactPage.sectionHeader");

  return (
    <section className="w-full py-20 px-4">
      <header className="relative max-w-6xl mx-auto text-center mb-20">
        <p className="inline-block px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/30 text-cyan-800 dark:text-cyan-300 text-[10px] font-bold mb-2 tracking-[0.2em] uppercase border border-cyan-100 dark:border-cyan-800/50">
          {t("eyebrow")}
        </p>

        <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight">
          {t("title")}{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-brand-accent to-cyan-400">
              {t("titleAccent")}
            </span>

            <div className="absolute bottom-2 left-0 w-full h-2 bg-brand-accent/30 blur-sm" />
          </span>
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
          {t("description")}
        </p>

        <div className="flex justify-center mt-12">
          <div className="w-72 h-0.5 bg-linear-to-r from-transparent via-brand-accent/50 to-transparent" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ContactInformation />
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
