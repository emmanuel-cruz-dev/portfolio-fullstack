import { ExternalLink } from "lucide-react";

import {
  GithubIcon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components";

type Props = {
  githubUrl?: string | null;
  demoUrl?: string | null;
  githubLabel: string;
  demoLabel: string;
};

export function CardLinks({
  githubUrl,
  demoUrl,
  githubLabel,
  demoLabel,
}: Props) {
  const links = [
    { href: githubUrl, label: githubLabel, Icon: GithubIcon },
    { href: demoUrl, label: demoLabel, Icon: ExternalLink },
  ];

  return (
    <div className="relative z-10 flex gap-3">
      {links.map(({ href, label, Icon }) =>
        href ? (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ) : null
      )}
    </div>
  );
}
