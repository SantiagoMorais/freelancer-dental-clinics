import { ClientProject } from "@prisma/client";

import { db } from "@/lib/prisma";

export const getClientProjects = async (
  clientId: string
): Promise<ClientProject[]> => {
  const client = await db.client.findUnique({
    where: { id: clientId },
  });

  if (!client) throw new Error("There is no client with this ID");

  return db.clientProject.findMany({
    where: { clientId },
  });
};
