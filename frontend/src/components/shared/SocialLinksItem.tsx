"use client";

import { toast } from "sonner";

import { cn } from "@/lib/utils";
import {
  buttonVariants,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Dock,
  DockIcon,
} from "@/components/ui";
import { EMAIL, CONTACT_DATA } from "@/constants";

const iconClass = cn(
  buttonVariants({ variant: "ghost", size: "icon" }),
  "size-12 rounded-full cursor-pointer"
);

function SocialLinksItem() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    toast.success("Email copiado al portapapeles");
  };

  return (
    <article className="w-fit -mt-6">
      <Dock direction="middle">
        {CONTACT_DATA.actions.map((item) => (
          <DockIcon key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                {item.type === "link" ? (
                  <a
                    href={item.href!}
                    aria-label={item.label}
                    className={iconClass}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <item.icon className="size-4" />
                  </a>
                ) : (
                  <button
                    onClick={handleCopyEmail}
                    aria-label={item.label}
                    className={iconClass}
                  >
                    <item.icon className="size-4" />
                  </button>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}

        <Separator orientation="vertical" className="h-full" />

        {Object.entries(CONTACT_DATA.social).map(([name, social]) => (
          <DockIcon key={name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={social.url}
                  aria-label={social.name}
                  className={iconClass}
                  target={name === "Email" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                >
                  <social.icon className="size-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{social.name}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </article>
  );
}

export default SocialLinksItem;
