import { Github, Linkedin, Mail } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/emmanuel-cruz-dev",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/emmanuel-cruz-dev/",
    icon: Linkedin,
  },
  { label: "Email", href: "mailto:emmanuelgerr@gmail.com", icon: Mail },
];

function SocialLinksItem() {
  return (
    <div className="flex items-center gap-1">
      {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              asChild
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

export default SocialLinksItem;
