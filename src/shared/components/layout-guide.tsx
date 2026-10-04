"use client";

import { useEffect, useState } from "react";

const COLUMNS = 12;

export function LayoutGuide() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "g") {
        e.preventDefault();
        setVisible((v) => !v);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!visible) return null;

  return (
    <section
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-9999"
    >
      <div className="relative mx-auto h-full w-full max-w-6xl px-4 xl:px-0">
        <div className="absolute inset-y-0 left-4 xl:left-0 w-px bg-red-500/60" />
        <div className="absolute inset-y-0 right-4 xl:right-0 w-px bg-red-500/60" />

        <div className="grid h-full grid-cols-4 gap-4 md:grid-cols-12 md:gap-6">
          {Array.from({ length: COLUMNS }).map((_, i) => (
            <div
              key={i}
              className={`bg-red-500/10 ${i >= 4 ? "hidden md:block" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-1/2 w-px bg-blue-500/40" />

      <div className="absolute bottom-2 left-2 rounded bg-black/80 px-2 py-1 font-mono text-[10px] text-white">
        <span className="sm:hidden">base</span>
        <span className="hidden sm:inline md:hidden">sm</span>
        <span className="hidden md:inline lg:hidden">md</span>
        <span className="hidden lg:inline xl:hidden">lg</span>
        <span className="hidden xl:inline 2xl:hidden">xl</span>
        <span className="hidden 2xl:inline">2xl</span>
      </div>
    </section>
  );
}
