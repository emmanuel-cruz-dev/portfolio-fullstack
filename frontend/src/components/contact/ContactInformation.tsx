import { useTranslations } from "next-intl";
import { Mail, Clock, MapPin } from "lucide-react";

import { SocialLinksItem } from "../shared";

function ContactInformation() {
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
        <h3 className="text-2xl font-bold mb-3">{t("title")}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t("subtitle")}
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {contactInfo.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4">
            <figure className="w-11 h-11 rounded-full bg-violet-500/10 dark:bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-violet-400" />
            </figure>
            <aside>
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-muted-foreground text-sm">{value}</p>
            </aside>
          </div>
        ))}
      </div>

      <SocialLinksItem />
    </article>
  );
}

export default ContactInformation;
