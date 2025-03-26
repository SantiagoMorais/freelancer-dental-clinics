import { TFormRegisterClientSchema } from "../types/form-register-client-schema";

export interface FormFieldConfig {
  name: keyof TFormRegisterClientSchema;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  format?: string;
  customComponent?: "PatternFormat" | "Switch";
}
