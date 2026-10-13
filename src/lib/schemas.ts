import { z } from "zod";

const phoneSchema = z.string().trim().min(8, "Ingresá un teléfono válido").max(30, "El teléfono es demasiado largo");

export const leadSchema = z.object({
  kind: z.enum(["contact", "trial", "quote"]),
  name: z.string().trim().min(2, "Ingresá tu nombre").max(80),
  email: z.email("Ingresá un email válido"),
  phone: phoneSchema,
  branch: z.string().trim().min(1, "Elegí una sede"),
  reason: z.string().trim().min(2, "Elegí un motivo"),
  activity: z.string().trim().optional(),
  message: z.string().trim().max(1000, "El mensaje es demasiado largo"),
  website: z.string().max(0).optional(),
});

export const quoteSchema = z.object({
  kind: z.literal("quote"),
  name: z.string().trim().min(2, "Ingresá tu nombre").max(80),
  company: z.string().trim().max(100),
  phone: phoneSchema,
  email: z.email("Ingresá un email válido"),
  province: z.string().trim().min(2, "Ingresá tu provincia").max(80),
  customerType: z.enum(["Particular", "Gimnasio", "Distribuidor"], { message: "Elegí el tipo de cliente" }),
  product: z.string().trim().min(1, "Elegí un producto"),
  quantity: z.number().int().min(1, "La cantidad mínima es 1").max(1000),
  message: z.string().trim().max(1000),
  website: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
