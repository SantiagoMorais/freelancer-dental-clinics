import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { TFormRegisterClientSchema } from "@/core/types/form-register-client-schema";
import { getAddressByZipCode } from "@/functions/get-address-by-zip-code";

interface IProcessZipCode {
  zipCode: string;
  setProcessingZipCode: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<TFormRegisterClientSchema>;
}

export const processZipCode = async ({
  setProcessingZipCode,
  zipCode,
  form,
}: IProcessZipCode) => {
  setProcessingZipCode(true);
  try {
    const address = await getAddressByZipCode(zipCode);
    form.setValue("street", address.logradouro);
    form.setValue("neighborhood", address.bairro);
    form.setValue("city", address.localidade);
    form.setValue("state", address.uf);
  } catch (error) {
    console.error("Erro ao buscar endereço:", error);
    toast.error(
      "CEP inválido. Tente novamente ou preencha o endereço manualmente.",
      {
        description: "",
      }
    );
  } finally {
    setProcessingZipCode(false);
  }
};
