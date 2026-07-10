import { Link } from "@/i18n/navigation";
import {
  Home,
  FolderOpen,
  Briefcase,
  GraduationCap,
  Mail,
  Search,
} from "lucide-react";

import { Button } from "@/components";
import { BackButton } from "@/shared";

function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <figure className="p-4 bg-muted rounded-full border border-border">
            <Search className="text-4xl" />
          </figure>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Página no encontrada
        </h1>

        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <div className="flex justify-center gap-2">
          <Link href="/">
            <Button size="lg" className="gap-2 px-6 cursor-pointer">
              <Home className="h-4 w-4" />
              Ir al inicio
            </Button>
          </Link>
          <BackButton />
        </div>

        <div className="pt-8 border-t border-border/60">
          <p className="text-sm text-muted-foreground mb-4">
            Puedes navegar a estas secciones:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Home className="h-3.5 w-3.5" />
              Inicio
            </Link>
            <Link
              href="/education"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <GraduationCap className="h-3.5 w-3.5" />
              Formación
            </Link>
            <Link
              href="/experience"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Briefcase className="h-3.5 w-3.5" />
              Experiencia
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <FolderOpen className="h-3.5 w-3.5" />
              Proyectos
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
