import { IconCloud } from "@/components";

const slugs = [
  "clickup",
  "css3",
  "express",
  "fastapi",
  "figma",
  "firebase",
  "git",
  "github",
  "html5",
  "java",
  "javascript",
  "jira",
  "nextdotjs",
  "nestjs",
  "nodedotjs",
  "notion",
  "postgresql",
  "mysql",
  "mongodb",
  "prisma",
  "python",
  "react",
  "supabase",
  "tailwindcss",
  "typescript",
  "vercel",
  "visualstudiocode",
];

export function IconCloudItem() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <article className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </article>
  );
}
