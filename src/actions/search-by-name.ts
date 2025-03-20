"use server";

import { Client } from "@prisma/client";

import { db } from "@/lib/prisma";

export const searchByName = async (name: string): Promise<Client[]> => {
  const response = await db.client.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      companyName: {
        contains: name,
        mode: "insensitive",
      },
    },
  });

  return response;
};
