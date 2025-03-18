import { toast } from "sonner";

import { registerClient } from "@/actions/register-client";
import { TFormRegisterClientSchema } from "@/core/types/form-register-client-schema";

export const registerClientOnSubmitForm = async ({
  data,
  setIsLoading,
}: {
  data: TFormRegisterClientSchema;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  setIsLoading(true);
  const address = `${data.street}, ${data.addressNumber} - ${data.neighborhood}, ${data.city} - ${data.state}`;

  try {
    await registerClient({
      companyName: data.companyName,
      address,
      hasAnWebSite: data.hasAnWebSite,
      openingHours: data.openingHours,
      ...(data.socialMedia && { socialMedia: data.socialMedia }),
      ...(data.notes && { notes: data.notes }),
      ...(data.mobilePhoneNumber && {
        mobilePhoneNumber: data.mobilePhoneNumber,
      }),
      ...(data.phoneNumber && {
        phoneNumber: data.phoneNumber,
      }),
    });
    toast("Cliente registrado com sucesso! Veja na lista de novos clientes.", {
      description: "",
    });
  } catch (error) {
    console.error("Error registering a new client:", error);
    toast(`Erro: ${error}`, { description: "" });
  } finally {
    setIsLoading(false);
  }
};
