import { z } from "zod";

export const deleteProjectMessageConfirmation = ({
  projectName,
}: {
  projectName: string;
}) => {
  return `Excluir ${projectName.slice(0, 50)}`;
};

export const deleteProjectSchema = ({ projectName }: { projectName: string }) =>
  z.object({
    typeConfirmation: z
      .string()
      .refine(
        (value) =>
          value.toLowerCase() ===
          deleteProjectMessageConfirmation({ projectName }).toLowerCase(),
        {
          message: "O texto digitado não coincide.",
        }
      ),
  });
