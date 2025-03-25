import { toast } from "sonner";

import { updateClient } from "@/actions/update-client";
import { TFormRegisterClientSchema } from "@/core/types/form-register-client-schema";

export const updateClientOnSubmitForm = async ({
  data,
  setIsLoading,
  clientId,
}: {
  data: TFormRegisterClientSchema;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  clientId: string;
}) => {
  setIsLoading(true);
  const address = `${data.street}, ${data.addressNumber} - ${data.neighborhood}, ${data.city} - ${data.state}`;

  try {
    await updateClient({
      id: clientId,
      companyName: data.companyName,
      address,
      hasAnWebSite: data.hasAnWebSite,
      openingHours: data.openingHours,
      ...(data.socialMedia && { socialMedia: data.socialMedia }),
      ...(data.notes && { notes: data.notes }),
      ...(data.mobilePhoneNumber && {
        mobilePhoneNumber: data.mobilePhoneNumber,
      }),
      ...(data.phoneNumber && { phoneNumber: data.phoneNumber }),
    });
    toast.success("Dados atualizados com sucesso!");
  } catch (error) {
    console.error("Error updating client info:", error);
  } finally {
    setIsLoading(false);
  }
};
