"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { AlertCircle, Send } from "lucide-react";

import { useIsDarkTheme } from "@/hooks";
import { getContactSchema, ContactFormValues } from "@/schemas";
import { checkRateLimit, incrementRateLimit } from "@/lib/utils/contact.utils";
import {
  Button,
  Input,
  Textarea,
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  MagicCard,
} from "@/components/ui";
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, MAX_PER_DAY } from "@/constants";
import { useTranslations } from "next-intl";

type Status = "idle" | "loading" | "success" | "error" | "rate_limited";

function ContactForm() {
  const t = useTranslations("contactPage.contactForm");
  const isDarkTheme = useIsDarkTheme();
  const [status, setStatus] = useState<Status>(() =>
    checkRateLimit() ? "idle" : "rate_limited"
  );

  const { control, handleSubmit, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(getContactSchema(t)),
    defaultValues: { name: "", subject: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    if (!checkRateLimit()) {
      setStatus("rate_limited");
      return;
    }

    setStatus("loading");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: values.name,
          user_name: values.name,
          user_email: values.email,
          subject: values.subject,
          message: values.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      incrementRateLimit();
      toast.success(t("messages.success"));
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      toast.error(t("messages.error"));
    }
  }

  const inputStyles =
    "bg-gray-100 border dark:bg-white/5 dark:border-white/10 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-brand-accent/30 focus-visible:border-brand-accent transition-all duration-200 rounded-md";

  return (
    <MagicCard
      className="rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-2xl"
      gradientColor={isDarkTheme ? "#262626" : "#e0e0e0"}
      gradientFrom="#00d4ff"
      gradientTo="#9E7AFF"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="contact-name"
                    className="text-foreground/80 text-sm ml-1"
                  >
                    {t("labels.name")}
                    <span className="text-brand-accent">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-name"
                    placeholder={t("placeholders.name")}
                    className={inputStyles}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-400 text-xs ml-1"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="subject"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="contact-subject"
                    className="text-foreground/80 text-sm ml-1"
                  >
                    {t("labels.subject")}
                    <span className="text-brand-accent">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-subject"
                    placeholder={t("placeholders.subject")}
                    className={inputStyles}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-400 text-xs ml-1"
                    />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="contact-email"
                  className="text-foreground/80 text-sm ml-1"
                >
                  {t("labels.email")}
                  <span className="text-brand-accent">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="contact-email"
                  type="email"
                  placeholder={t("placeholders.email")}
                  className={inputStyles}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-400 text-xs ml-1"
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="message"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="contact-message"
                  className="text-foreground/80 text-sm ml-1"
                >
                  {t("labels.message")}
                  <span className="text-brand-accent">*</span>
                </FieldLabel>
                <Textarea
                  {...field}
                  id="contact-message"
                  placeholder={t("placeholders.message")}
                  rows={4}
                  className={`${inputStyles} resize-none`}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-400 text-xs ml-1"
                  />
                )}
              </Field>
            )}
          />

          {status === "rate_limited" && (
            <div className="flex items-center gap-3 rounded-xl p-4 animate-in fade-in zoom-in duration-300 border text-amber-400 bg-amber-400/10 border-amber-400/20">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">
                {t("messages.rateLimit", { max: MAX_PER_DAY })}
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={status === "loading" || status === "rate_limited"}
            className="w-full h-12 bg-brand-accent dark:hover:brightness-110 disabled:opacity-40 text-black hover:text-white dark:hover:text-black font-bold rounded-md flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.15)] dark:hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] active:scale-[0.98] cursor-pointer"
          >
            {status === "loading" ? (
              <>
                {t("labels.sending")}
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              </>
            ) : (
              <>
                {t("labels.submit")}
                <Send className="w-5 h-5" />
              </>
            )}
          </Button>
        </FieldGroup>
      </form>
    </MagicCard>
  );
}

export default ContactForm;
