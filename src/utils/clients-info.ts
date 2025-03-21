import { Client } from "@prisma/client";

interface IClientsInfo {
  title: string;
  content: string;
}

export const clientsInfo = ({ client }: { client: Client }): IClientsInfo[] => [
  { title: "Endereço", content: client.address },
  {
    title: "Já possui um site",
    content: client.hasAnWebSite ? "Sim" : "Não",
  },
  {
    title: "Último contato",
    content: client.lastContactedAt ? client.lastContactedAt.toString() : "-",
  },
  {
    title: "Horário de funcionamento",
    content: client.openingHours,
  },
  {
    title: "Telefone Celular",
    content: client.mobilePhoneNumber ? client.mobilePhoneNumber : "-",
  },
  {
    title: "Telefone fixo",
    content: client.phoneNumber ? client.phoneNumber : "-",
  },
  {
    title: "Notas extras",
    content: client.notes ? client.notes : "-",
  },
  {
    title: "Rede Social",
    content: client.socialMedia ? client.socialMedia : "-",
  },
];
