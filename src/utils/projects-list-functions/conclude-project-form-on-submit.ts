import { toast } from "sonner";

import { concludeProject } from "@/actions/conclude-project";
import { TConcludeProjectSchema } from "@/core/types/conclude-project-schema";

export const concludeProjectFormOnSubmit = async ({
  setIsLoading,
  data,
  clientId,
  projectId,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  data: TConcludeProjectSchema;
  projectId: string;
  clientId: string;
}) => {
  try {
    setIsLoading(true);
    await concludeProject({
      clientId,
      finishedAt: data.finishedAt,
      rating: data.rating,
      projectId,
      review: data.review,
    });
    toast.success("Projeto concluído com sucesso!");
  } catch (error) {
    if (process.env.NODE_ENV === "development")
      console.error("Error by editing project to concluded:", error);
    toast.error(
      "Não foi possível editar o projeto para CONCLUÍDO. Por favor, tente mais tarde."
    );
  } finally {
    setIsLoading(false);
  }
};
