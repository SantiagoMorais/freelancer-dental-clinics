import { TFormRegisterClientSchema } from "@/core/types/form-register-client-schema";

export const useFormDefaultValues: TFormRegisterClientSchema = {
  companyName: "",
  street: "",
  neighborhood: "",
  addressNumber: "",
  state: "",
  city: "",
  openingHours: "",
  complement: "",
  notes: "",
  socialMedia: "",
  hasAnWebSite: false,
};
