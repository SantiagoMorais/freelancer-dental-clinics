import { TFormRegisterClientSchema } from "../types/form-register-client-schema";

export interface IFormFields {
  form: UseFormReturn<TFormRegisterClientSchema>;
  setProcessingZipCode: React.Dispatch<React.SetStateAction<boolean>>;
}
