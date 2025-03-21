"use server";

import { db } from "@/lib/prisma";

export const deleteClientRegister = async (clientId: string) => {
  const client = db.client.findUnique({
    where: {
      id: clientId,
    },
  });

  if (!client) throw new Error("There is no client with this ID");

  await db.client.delete({
    where: { id: clientId },
  });
};
