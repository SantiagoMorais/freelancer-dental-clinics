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
    .refine((value) => value !== "", { message: "Este campo é obrigatório" }),
  serviceCategory: z
    .enum(serviceCategoryValues)
    .default(ServiceCategory.LANDING_PAGE),
  projectName: z
    .string()
    .min(2, { message: "O nome deve conter entre 2 e 50 caracteres" })
    .max(50, { message: "O nome deve conter entre 2 e 50 caracteres" }),
  githubUrl: z.string().optional(),
  projectUrl: z.string().optional(),
});

export type TRegisterProjectSchema = z.infer<typeof registerProjectSchema>;
