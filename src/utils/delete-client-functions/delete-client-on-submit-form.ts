import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteClientRegister } from "@/actions/delete-client-register";

export const deleteClientOnSubmitForm = async ({
  setIsLoading,
  clientId,
  queryClient,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  clientId: string;
  queryClient: QueryClient;
}) => {
  setIsLoading(true);

  try {
    await deleteClientRegister({ clientId });
    await queryClient.invalidateQueries({ queryKey: ["clients"] });
    await queryClient.invalidateQueries({ queryKey: ["searchClients"] });
    window.location.href = "/";
    toast.success("Cliente deletado com sucesso!");
  } catch (error) {
    if (process.env.NODE_ENV === "development")
      console.error("Error updating client info:", error);
    toast.error(
      "Não foi possível deletar os dados deste cliente. Por favor, tente mais tarde."
    );
  } finally {
    setIsLoading(false);
  }
};
