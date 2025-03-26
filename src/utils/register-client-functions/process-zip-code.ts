import { toast } from "sonner";

import { IProcessZipCode } from "@/core/interfaces/process-zip-code-function";
import { getAddressByZipCode } from "@/functions/get-address-by-zip-code";

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
