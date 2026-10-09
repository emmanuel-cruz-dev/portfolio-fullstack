"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

import { ContactInformation } from "./contact-information";
import { ContactForm } from "./contact-form";
import { PageHeader, fadeInUp } from "@/shared";

export function ContactClient() {
  const t = useTranslations("contact.sectionHeader");

  return (
    <section className="section-gradient-a px-6 xl:px-0 pt-10">
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleAccent={t("titleAccent")}
        description={t("description")}
      />

      <div className="section-gradient-b pb-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-24"
            variants={fadeInUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-180px" }}
          >
            <ContactInformation />
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            variants={fadeInUp}
            custom={0.15}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-180px" }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
