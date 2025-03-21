import { Client } from "@prisma/client";

export interface IClientsInfo {
  title: string;
  field: string;
  content: string;
}

const fieldTitles: Record<string, string> = {
  address: "Endereço",
  hasAnWebSite: "Já possui um site",
  lastContactedAt: "Último contato",
  openingHours: "Horário de funcionamento",
  mobilePhoneNumber: "Telefone Celular",
  phoneNumber: "Telefone fixo",
  notes: "Notas extras",
  socialMedia: "Rede Social",
};

export const clientsInfo = ({ client }: { client: Client }): IClientsInfo[] => {
  return Object.keys(fieldTitles).map((field) => {
    const value = client[field as keyof Client];
    let content = value;

    if (field === "hasAnWebSite") {
      content = value ? "Sim" : "Não";
    } else if (value === null || value === undefined) {
      content = "-";
    } else if (value instanceof Date) {
      content = value.toString();
    } else {
      content = String(value);
    }

    return {
      title: fieldTitles[field],
      field,
      content,
    };
  });
};
