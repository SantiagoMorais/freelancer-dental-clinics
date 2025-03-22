import { z } from "zod";

export const concludeProjectSchema = z.object({
  finishedAt: z.date(),
  rating: z
    .number()
    .min(0, { message: "A nota deve variar de 0 a 5" })
    .max(5, { message: "A nota deve variar de 0 a 5" }),
  review: z
    .string()
    .max(500, { message: "A análise deve conter no máximo 500 caracteres" })
    .optional(),
});

export type TConcludeProjectSchema = z.infer<typeof concludeProjectSchema>;
