import { Client } from "@prisma/client";

interface IClientCardProps {
  client: Pick<
    Client,
    "companyName" | "workingProgress" | "id" | "openingHours" | "address"
  >;
}
