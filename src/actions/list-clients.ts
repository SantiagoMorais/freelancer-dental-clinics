"use server";

import { db } from "@/lib/prisma";

export const listClients = async () => {
  const response = await db.client.findMany({
    orderBy: { createdAt: "asc" },
  });

  return response;
};
