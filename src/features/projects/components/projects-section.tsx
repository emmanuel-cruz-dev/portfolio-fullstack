import { Project } from "@/features/projects/types";

interface ProjectsSectionProps {
  title: string;
  subtitle?: string;
  projects: Project[];
  href?: string;
  actionLabel?: string;
}

export function ProjectsSection({
  title,
  subtitle,
  projects,
  href,
  actionLabel,
}: ProjectsSectionProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-16 md:py-24">
      <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-center text-lg font-medium text-gray-500 sm:text-xl md:text-2xl">
          {subtitle}
        </p>
      )}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.href}
            className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 p-8 shadow-md transition-shadow hover:shadow-lg"
          >
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="text-lg font-medium text-gray-500">
              {project.description}
            </p>
          </a>
        ))}
      </div>
      {href && (
        <a
          href={href}
          className="flex items-center justify-center gap-4 rounded-xl border border-gray-200 p-8 shadow-md transition-shadow hover:shadow-lg"
        >
          <span className="text-2xl font-bold">{actionLabel}</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      )}
    </section>
  );
}
