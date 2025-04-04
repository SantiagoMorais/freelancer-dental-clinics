"use server";

import { Client } from "@prisma/client";

import { db } from "@/lib/prisma";

export const getClientDetails = async ({
  clientId,
}: {
  clientId: string;
}): Promise<Client> => {
  const client = await db.client.findUnique({
    where: {
      id: clientId,
    },
  });

  if (!client) throw new Error("There is no client with this ID");

  return client;
};
