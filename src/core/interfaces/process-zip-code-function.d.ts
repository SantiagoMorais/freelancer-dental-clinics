import { TFormRegisterClientSchema } from "../types/form-register-client-schema";

export interface IProcessZipCode {
  zipCode: string;
  setProcessingZipCode: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<TFormRegisterClientSchema>;
}
