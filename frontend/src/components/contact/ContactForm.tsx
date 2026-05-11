"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { CheckCircle, Send } from "lucide-react";

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

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY!;

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
  try {
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
  } catch {}
}

type Status = "idle" | "loading" | "success" | "error" | "rate_limited";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const { control, handleSubmit, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { nombre: "", asunto: "", email: "", mensaje: "" },
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
          from_name: values.nombre,
          subject: values.asunto,
          reply_to: values.email,
          message: values.mensaje,
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

  return (
    <article className="dark:bg-white/5 border dark:border-white/10 rounded-2xl p-6 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="nombre"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="contact-nombre"
                    className="text-muted-foreground text-sm font-medium"
                  >
                    Nombre<span className="text-violet-400">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-nombre"
                    placeholder="Tu nombre"
                    aria-invalid={fieldState.invalid}
                    className="bg-neutral-200 dark:bg-black/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-violet-500 focus-visible:border-violet-500 rounded-md"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-400 text-xs"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="asunto"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="contact-asunto"
                    className="text-muted-foreground text-sm font-medium"
                  >
                    Asunto<span className="text-violet-400">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-asunto"
                    placeholder="¿De qué trata?"
                    aria-invalid={fieldState.invalid}
                    className="bg-neutral-200 dark:bg-black/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-violet-500 focus-visible:border-violet-500 rounded-md"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-400 text-xs"
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
                  className="text-slate-300 text-sm font-medium"
                >
                  Email <span className="text-violet-400">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="contact-email"
                  type="email"
                  placeholder="tu@email.com"
                  aria-invalid={fieldState.invalid}
                  className="bg-neutral-200 dark:bg-black/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-violet-500 focus-visible:border-violet-500 rounded-md"
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-400 text-xs"
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="mensaje"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="contact-mensaje"
                  className="text-slate-300 text-sm font-medium"
                >
                  Mensaje <span className="text-violet-400">*</span>
                </FieldLabel>
                <Textarea
                  {...field}
                  id="contact-mensaje"
                  placeholder="Cuéntame sobre tu proyecto..."
                  rows={5}
                  aria-invalid={fieldState.invalid}
                  className="bg-neutral-200 dark:bg-black/50 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-violet-500 focus-visible:border-violet-500 rounded-md resize-none"
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-400 text-xs"
                  />
                )}
              </Field>
            )}
          />

          {status === "success" && (
            <p className="flex items-center justify-center gap-2 text-emerald-400 text-sm text-center bg-emerald-400/10 border border-emerald-400/20 rounded-xl py-3">
              <CheckCircle /> Mensaje enviado. Te respondo dentro de 24 horas.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-xl py-3">
              Ocurrió un error al enviar. Intentá de nuevo.
            </p>
          )}
          {status === "rate_limited" && (
            <p className="text-amber-400 text-sm text-center bg-amber-400/10 border border-amber-400/20 rounded-xl py-3">
              Alcanzaste el límite de {MAX_PER_DAY} mensajes por día.
            </p>
          )}

          <Button
            type="submit"
            disabled={status === "loading" || status === "rate_limited"}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold rounded-md flex items-center justify-center gap-2 transition-all duration-200"
          >
            {status === "loading" ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar Mensaje
                <Send className="w-4 h-4" />
              </>
            )}
          </Button>
        </FieldGroup>
      </form>
    </article>
  );
}

export default ContactForm;
