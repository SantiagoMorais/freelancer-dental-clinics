import { toast } from "sonner";

import { deleteClientProject } from "@/actions/delete-client-project";

export const deleteClientProjectOnSubmitForm = async ({
  setIsLoading,
  clientId,
  projectId,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  clientId: string;
  projectId: string;
}) => {
  setIsLoading(true);

  try {
    await deleteClientProject({ clientId, projectId });
    toast.success("Projeto deletado com sucesso!");
  } catch (error) {
    if (process.env.NODE_ENV === "development")
      console.error("Error updating client info:", error);
    toast.error(
      "Não foi possível deletar os dados deste projeto. Por favor, tente mais tarde."
    );
  } finally {
    setIsLoading(false);
  }
};
