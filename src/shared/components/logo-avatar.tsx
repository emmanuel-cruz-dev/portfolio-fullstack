import Image from "next/image";
import type { LucideIcon } from "lucide-react";

export function LogoAvatar({
  src,
  alt,
  Fallback,
}: {
  src?: string | null;
  alt: string;
  Fallback: LucideIcon;
}) {
  return (
    <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={48}
          height={48}
          className="size-full object-contain"
        />
      ) : (
        <Fallback className="size-6 text-muted-foreground" />
      )}
    </div>
  );
}
