import { TFormRegisterClientSchema } from "@/core/types/form-register-client-schema";

interface FormFieldConfig {
  name: keyof TFormRegisterClientSchema;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  format?: string;
  customComponent?: "PatternFormat" | "Switch";
}

export const formFields: FormFieldConfig[] = [
  {
    name: "companyName",
    label: "Nome do cliente/empresa",
    type: "text",
    placeholder: "Nome do cliente ou empresa",
    required: true,
  },
  {
    name: "mobilePhoneNumber",
    label: "Telefone Celular (Opcional)",
    type: "text",
    placeholder: "Número do Celular",
    format: "(##) # ####-####",
    customComponent: "PatternFormat",
  },
  {
    name: "phoneNumber",
    label: "Telefone Fixo (Opcional)",
    type: "text",
    placeholder: "Número do Telefone",
    format: "(##) ####-####",
    customComponent: "PatternFormat",
  },
  {
    name: "zipCode",
    label: "CEP (opcional)",
    type: "text",
    placeholder: "CEP",
    format: "#####-###",
    customComponent: "PatternFormat",
  },
  {
    name: "street",
    label: "Logradouro",
    type: "text",
    placeholder: "Logradouro/rua",
    required: true,
  },
  {
    name: "neighborhood",
    label: "Bairro",
    type: "text",
    placeholder: "Bairro",
    required: true,
  },
  {
    name: "addressNumber",
    label: "Número",
    type: "number",
    placeholder: "Número",
    required: true,
  },
  {
    name: "complement",
    label: "Complemento (opcional)",
    type: "text",
    placeholder: "Complemento",
  },
  {
    name: "city",
    label: "Cidade",
    type: "text",
    placeholder: "Cidade",
    required: true,
  },
  {
    name: "state",
    label: "UF",
    type: "text",
    placeholder: "UF. Ex: MG",
    required: true,
  },
  {
    name: "hasAnWebSite",
    label: "Já possui um site",
    type: "checkbox",
    customComponent: "Switch",
    required: true,
  },
  {
    name: "openingHours",
    label: "Horário de funcionamento",
    type: "text",
    placeholder: "Horário de funcionamento",
    required: true,
  },
  {
    name: "socialMedia",
    label: "Rede social do cliente (opcional)",
    type: "text",
    placeholder: "Rede Social",
  },
  {
    name: "notes",
    label: "Notas adicionais (opcional)",
    type: "text",
    placeholder: "Notas",
  },
];
