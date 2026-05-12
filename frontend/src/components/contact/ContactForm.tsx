"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { AlertCircle, CheckCircle, Send } from "lucide-react";

import { contactSchema, ContactFormValues } from "@/schemas";
import {
  Button,
  Input,
  Textarea,
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui";
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from "@/constants";

const RATE_LIMIT_KEY = "contact_submissions";
const MAX_PER_DAY = 3;

function checkRateLimit(): boolean {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const today = new Date().toDateString();
    if (!raw) return true;
    const data: { date: string; count: number } = JSON.parse(raw);
    if (data.date !== today) return true;
    return data.count < MAX_PER_DAY;
  } catch {
    return true;
  }
}

function incrementRateLimit() {
  const raw = localStorage.getItem(RATE_LIMIT_KEY);
  const today = new Date().toDateString();

  if (!raw || JSON.parse(raw).date !== today) {
    localStorage.setItem(
      RATE_LIMIT_KEY,
      JSON.stringify({ date: today, count: 1 })
    );
  } else {
    const data = JSON.parse(raw);
    localStorage.setItem(
      RATE_LIMIT_KEY,
      JSON.stringify({ date: today, count: data.count + 1 })
    );
  }
}

type Status = "idle" | "loading" | "success" | "error" | "rate_limited";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const { control, handleSubmit, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
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
          subject: values.subject,
          reply_to: values.email,
          message: values.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      incrementRateLimit();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const inputStyles =
    "bg-gray-100 border dark:bg-white/5 dark:border-white/10 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-brand-accent/30 focus-visible:border-brand-accent transition-all duration-200 rounded-md";

  return (
    <article className="bg-white/2 dark:bg-white/2 border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-2xl">
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
                    Nombre <span className="text-brand-accent">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-name"
                    placeholder="Tu nombre"
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
                    Asunto <span className="text-brand-accent">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-subject"
                    placeholder="Motivo del contacto"
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
                  Email <span className="text-brand-accent">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="contact-email"
                  type="email"
                  placeholder="tu@email.com"
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
                  Mensaje <span className="text-brand-accent">*</span>
                </FieldLabel>
                <Textarea
                  {...field}
                  id="contact-message"
                  placeholder="¿En qué puedo ayudarte?"
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

          {status === "success" && (
            <div className="flex items-center gap-3 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-4 animate-in fade-in zoom-in duration-300">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">¡Mensaje enviado con éxito!</p>
            </div>
          )}

          {(status === "error" || status === "rate_limited") && (
            <div
              className={`flex items-center gap-3 rounded-xl p-4 animate-in fade-in zoom-in duration-300 border ${
                status === "error"
                  ? "text-red-400 bg-red-400/10 border-red-400/20"
                  : "text-amber-400 bg-amber-400/10 border-amber-400/20"
              }`}
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">
                {status === "error"
                  ? "Error al enviar. Inténtalo de nuevo."
                  : `Límite diario alcanzado (${MAX_PER_DAY} mensajes).`}
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
                Enviando...
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              </>
            ) : (
              <>
                Enviar Mensaje
                <Send className="w-5 h-5" />
              </>
            )}
          </Button>
        </FieldGroup>
      </form>
    </article>
  );
}

export default ContactForm;
