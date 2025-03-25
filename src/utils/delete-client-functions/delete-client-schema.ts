import { z } from "zod";

export const deleteMessageConfirmation = ({
  clientName,
}: {
  clientName: string;
}) => {
  return `Excluir ${clientName.slice(0, 50)}`;
};

export const deleteClientSchema = ({ clientName }: { clientName: string }) =>
  z.object({
    typeConfirmation: z
      .string()
      .refine(
        (value) =>
          value.toLowerCase() ===
          deleteMessageConfirmation({ clientName }).toLowerCase(),
        {
          message: "O texto digitado não coincide.",
        }
      ),
  });
