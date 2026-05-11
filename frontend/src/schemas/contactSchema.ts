import { z } from "zod";

export const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  asunto: z.string().min(4, "El asunto debe tener al menos 4 caracteres."),
  email: z.string().email("Ingresá un email válido."),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
