"use server";

import { Client } from "@prisma/client";

import { db } from "@/lib/prisma";

export const searchByName = async (
  name: string,
  cursor?: string
): Promise<{ clients: Client[]; hasMore: boolean }> => {
  const pageSize = 10;
  const clients = await db.client.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      companyName: {
        contains: name,
        mode: "insensitive",
      },
    },
    take: pageSize + 1,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
  });

  const hasMore = clients.length > pageSize;

  return {
    clients: hasMore ? clients.slice(0, pageSize) : clients,
    hasMore,
  };
};
