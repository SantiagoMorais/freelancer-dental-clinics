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

  if (!client) throw new Error("The id doesn't match with any client register");

  return client;
};
