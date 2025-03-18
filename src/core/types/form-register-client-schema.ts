import { z } from "zod";

export const formRegisterClientSchema = z.object({
  companyName: z
    .string()
    .min(2, { message: "O nome deve ter no mínimo 2 caracteres" })
    .max(100, {
      message: "O nome deve ter no máximo 100 caracteres",
    }),
  zipCode: z.coerce
    .string()
    .length(9, { message: "O CEP deve possuir 8 números" })
    .optional(),
  street: z.string(),
  neighborhood: z.string(),
  city: z.string().min(2, { message: "Digite um valor válido" }),
  state: z.string().length(2, { message: "Digite somente a UF. Ex: MG" }),
  addressNumber: z.string().min(1, { message: "Escolha um valor válido" }),
  complement: z.coerce.string().optional(),
  mobilePhoneNumber: z.coerce
    .string()
    .refine(
      (phoneNumber) => {
        return /^\(\d{2}\)\s9\s\d{4}-\d{4}$/.test(phoneNumber);
      },
      {
        message: "Siga o padrão: (99) 9 9999-9999",
      }
    )
    .optional(),
  phoneNumber: z.coerce
    .string()
    .refine(
      (phoneNumber) => {
        return /^\(\d{2}\)\s?\d{4}-\d{4}$/.test(phoneNumber);
      },
      {
        message: "Siga o padrão: (99) 9999-9999",
      }
    )
    .optional(),
  openingHours: z.string().min(1, { message: "Campo obrigatório" }),
  socialMedia: z.coerce.string().optional(),
  hasAnWebSite: z.boolean().default(false),
  notes: z.coerce.string().optional(),
});

export type TFormRegisterClientSchema = z.infer<
  typeof formRegisterClientSchema
>;
