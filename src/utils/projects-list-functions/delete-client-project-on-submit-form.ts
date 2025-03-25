import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteClientProject } from "@/actions/delete-client-project";

export const deleteClientProjectOnSubmitForm = async ({
  clientId,
  projectId,
  setIsLoading,
  queryClient,
}: {
  clientId: string;
  projectId: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  queryClient: QueryClient;
}) => {
  try {
    setIsLoading(true);
    await deleteClientProject({ clientId, projectId });
    await queryClient.invalidateQueries({ queryKey: ["clientProjects"] });
    toast.success("Projeto excluído com sucesso!");
  } catch (error) {
    if (process.env.NODE_ENV === "development")
      console.error("Error by deleting client project:", error);
    toast.error(
      "Não foi possível editar o projeto para CONCLUÍDO. Por favor, tente mais tarde."
    );
  } finally {
    setIsLoading(false);
  }
};
