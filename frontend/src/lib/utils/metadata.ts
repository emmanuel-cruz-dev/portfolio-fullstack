import { getTranslations } from "next-intl/server";

type MetadataParams = {
  locale: string;
  namespace: string;
};

export async function getPageMetadata({ locale, namespace }: MetadataParams) {
  const t = await getTranslations({ locale, namespace });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}
