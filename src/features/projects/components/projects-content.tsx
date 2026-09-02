import { FolderGit2 } from "lucide-react";

export function ProjectsContent() {
  return (
    <article className="w-full max-w-6xl mx-auto py-12 px-4">
      <section className="rounded-2xl border-2 border-dashed border-border bg-card/50 backdrop-blur-sm p-8 md:p-12 text-center flex flex-col items-center justify-center gap-4 shadow-xs">
        <figure className="p-4 rounded-full bg-primary/10 text-primary mb-2">
          <FolderGit2 className="w-10 h-10" />
        </figure>

        <header className="space-y-2 max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Proyectos Destacados
          </h2>
          <p className="text-sm text-muted-foreground">
            Preparando demostraciones técnicas, arquitectura de código y
            despliegues en vivo. Esta sección estará disponible muy pronto.
          </p>
        </header>
      </section>
    </article>
  );
}
