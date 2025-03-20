"use server";

import { Client } from "@prisma/client";

import { db } from "@/lib/prisma";

export const listClients = async (cursor?: string): Promise<Client[]> => {
  const pageSize = 5;
  const response = await db.client.findMany({
    take: pageSize,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: { createdAt: "desc" },
  });

  return response;
};
