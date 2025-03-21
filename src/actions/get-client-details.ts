"use server";

import { Client, ClientProject } from "@prisma/client";

import { db } from "@/lib/prisma";

export const getClientDetails = async ({
  clientId,
}: {
  clientId: string;
}): Promise<Client & { clientProjects: ClientProject[] }> => {
  const client = await db.client.findUnique({
    where: {
      id: clientId,
    },
    include: { clientProjects: true },
  });

  if (!client) throw new Error("The id doesn't match with any client register");

  return client;
};
