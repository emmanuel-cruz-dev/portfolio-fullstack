import { useTranslations } from "next-intl";
import { Mail, Clock, MapPin } from "lucide-react";

import { SocialLinksItem } from "@/shared";

export function ContactInformation() {
  const t = useTranslations("contactPage.contactInformation");

  const contactInfo = [
    {
      icon: Mail,
      label: t("infoItems.emailLabel"),
      value: t("infoItems.emailValue"),
    },
    {
      icon: Clock,
      label: t("infoItems.timeLabel"),
      value: t("infoItems.timeValue"),
    },
    {
      icon: MapPin,
      label: t("infoItems.locationLabel"),
      value: t("infoItems.locationValue"),
    },
  ];

  return (
    <article className="flex flex-col gap-8">
      <header>
        <h3 className="text-2xl font-bold mb-3 tracking-tight">{t("title")}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
          {t("subtitle")}
        </p>
      </header>

      <div className="flex flex-col gap-5">
        {contactInfo.map(({ icon: Icon, label, value }) => (
          <div key={label} className="group flex items-center gap-4">
            <figure className="relative w-11 h-11 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-brand-accent/50 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]">
              <Icon className="w-5 h-5 text-brand-accent transition-transform duration-300 group-hover:scale-110" />
            </figure>

            <aside>
              <p className="font-medium text-sm text-foreground/90 group-hover:text-brand-accent transition-colors duration-300">
                {label}
              </p>
              <p className="text-muted-foreground text-sm">{value}</p>
            </aside>
          </div>
        ))}
      </div>

      <SocialLinksItem />
    </article>
  );
}
