import { Briefcase, ArrowLeft } from "lucide-react";

import { Link } from "@/i18n/navigation";

export function ExperienceDetailsPlaceholder({ slug }: { slug: string }) {
  return (
    <article className="w-full max-w-4xl mx-auto py-12 px-4">
      <Link
        href="/experience"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Ir a Experiencia
      </Link>

      <section className="rounded-2xl border-2 border-dashed border-border bg-card/50 backdrop-blur-sm p-8 md:p-12 text-center flex flex-col items-center justify-center gap-4 shadow-xs">
        <figure className="p-4 rounded-full bg-primary/10 text-primary mb-2">
          <Briefcase className="w-10 h-10" />
        </figure>

        <header className="space-y-2 max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Detalles de la experiencia
          </h2>

          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              Visualización de detalles de{" "}
              <strong className="text-foreground">{slug}</strong>
            </p>
            <p className="text-xs opacity-75">En construcción</p>
          </div>
        </header>

        <footer className="mt-4 pt-4 border-t border-dashed border-border w-full max-w-sm">
          <p className="text-xs text-muted-foreground">
            Contenido completo próximamente
          </p>
        </footer>
      </section>
    </article>
  );
}
