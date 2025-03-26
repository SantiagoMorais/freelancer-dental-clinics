import { WorkingProgress } from "@prisma/client";
import { z } from "zod";

const workingProgressValues = Object.values(WorkingProgress) as [
  string,
  ...string[],
];

export const updateClientStatusSchema = z.object({
  status: z.enum(workingProgressValues),
});

export type TUpdateClientStatusSchema = z.infer<
  typeof updateClientStatusSchema
>;
