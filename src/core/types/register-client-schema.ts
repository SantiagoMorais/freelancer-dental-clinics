import { z } from "zod";

export const registerClientSchema = z.object({
  companyName: z
    .string()
    .min(2, { message: "O nome deve ter no mínimo 2 caracteres" })
    .max(100, {
      message: "O nome deve ter no máximo 100 caracteres",
    }),
  address: z.string(),
  phone: z.coerce.string().refine(
    (phoneNumber) => {
      return /^\(\d{2}\)\s9\s\d{4}-\d{4}$/.test(phoneNumber);
    },
    {
      message: "Siga o padrão: (DDD) 9 9999-9999",
    }
  ),
  openingHours: z.string().min(1, { message: "Campo obrigatório" }),
  socialMedia: z.string().optional(),
  hasAnWebSite: z.boolean().default(false),
  notes: z.string().optional(),
});

export type TRegisterClientSchema = z.infer<typeof registerClientSchema>;
