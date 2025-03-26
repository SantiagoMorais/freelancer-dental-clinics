import { z } from "zod";

export const searchClientsFormSchema = z.object({
  name: z.string().min(1).trim(),
});

export type TSearchClientsForm = z.infer<typeof searchClientsFormSchema>;
