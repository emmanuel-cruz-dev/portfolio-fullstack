"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className={cn(
                "h-12 w-12 rounded-full shadow-2xl transition-all duration-300 cursor-pointer",
                "bg-white/10 dark:bg-black/20 backdrop-blur-md",
                "border-black/10 dark:border-white/10",
                "hover:bg-brand-accent hover:text-black dark:hover:bg-brand-accent",
                "shadow-[0_0_20px_rgba(0,212,255,0.15)] dark:hover:shadow-[0_0_25px_rgba(0,212,255,0.3)]"
              )}
              aria-label="Ir hacia arriba"
            >
              <ChevronUp className="size-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
