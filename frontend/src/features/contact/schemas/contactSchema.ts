import { z } from "zod";

type TranslationFn = (
  key: string,
  values?: { [key: string]: string }
) => string;

export const getContactSchema = (t: TranslationFn) =>
  z.object({
    name: z.string().min(2, t("validation.name")),
    subject: z.string().min(4, t("validation.subject")),
    email: z.email(t("validation.email")),
    message: z.string().min(10, t("validation.message")),
  });

export type ContactFormValues = z.infer<ReturnType<typeof getContactSchema>>;
