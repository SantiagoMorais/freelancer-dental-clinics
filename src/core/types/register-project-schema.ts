import { ServiceCategory } from "@prisma/client";
import { z } from "zod";

const serviceCategoryValues = Object.values(ServiceCategory) as [
  string,
  ...string[],
];

export const registerProjectSchema = z.object({
  servicePrice: z
    .string()
    .min(0, { message: "Este campo é obrigatório" })
    .refine(
      (value) => {
        const numbersOnly = /^[0-9]/;
        return value.match(numbersOnly);
      },
      {
        message: "Não use pontos ou vírgulas além de números.",
      }
    ),
  serviceCategory: z
    .enum(serviceCategoryValues)
    .default(ServiceCategory.LANDING_PAGE),
});

export type TRegisterProjectSchema = z.infer<typeof registerProjectSchema>;
