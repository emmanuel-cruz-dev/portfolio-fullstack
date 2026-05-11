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
  return (
    <section className="w-full py-20 px-4">
      <header className="max-w-6xl mx-auto text-center mb-16">
        <p className="text-violet-400 text-sm font-medium mb-4 tracking-widest uppercase">
          Conectemos
        </p>
        <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
          Transformando ideas en
          <br />
          <span className="text-violet-400">aplicaciones web</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
          Hablemos sobre tu proyecto y cómo podemos construir una solución
          moderna, rápida y funcional.
        </p>
        <div className="w-16 h-0.5 bg-violet-500 mx-auto mt-8" />
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <ContactInformation />
        <ContactForm />
      </div>
    </section>
  );
}

export default ContactPage;
