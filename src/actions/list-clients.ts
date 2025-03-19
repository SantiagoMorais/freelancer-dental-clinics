"use server";

import { Client } from "@prisma/client";

import { db } from "@/lib/prisma";

export const listClients = async (): Promise<Client[]> => {
  const response = await db.client.findMany({
    orderBy: { createdAt: "desc" },
  });

  return response;
};
