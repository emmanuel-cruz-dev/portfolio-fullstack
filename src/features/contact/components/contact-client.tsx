"use client";

import { motion, Variants } from "motion/react";
import { useTranslations } from "next-intl";

import { ContactInformation } from "./contact-information";
import { ContactForm } from "./contact-form";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

export function ContactClient() {
  const t = useTranslations("contactPage.sectionHeader");

  return (
    <section className="w-full py-20 px-4">
      <header className="relative max-w-6xl mx-auto text-center mb-20">
        <motion.p
          className="inline-block px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/30 text-cyan-800 dark:text-cyan-300 text-[10px] font-bold mb-2 tracking-[0.2em] uppercase border border-cyan-100 dark:border-cyan-800/50"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h2
          className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight"
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          animate="visible"
        >
          {t("title")}{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-brand-accent to-cyan-400">
              {t("titleAccent")}
            </span>
            <div className="absolute bottom-2 left-0 w-full h-2 bg-brand-accent/30 blur-sm" />
          </span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light"
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          animate="visible"
        >
          {t("description")}
        </motion.p>

        <motion.div
          className="flex justify-center mt-12"
          variants={fadeIn}
          custom={0.35}
          initial="hidden"
          animate="visible"
        >
          <div className="w-72 h-0.5 bg-linear-to-r from-transparent via-brand-accent/50 to-transparent" />
        </motion.div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <motion.div
          className="lg:col-span-5 lg:sticky lg:top-24"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-180px" }}
        >
          <ContactInformation />
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          variants={fadeUp}
          custom={0.15}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-180px" }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
