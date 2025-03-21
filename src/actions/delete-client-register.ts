"use server";

import { db } from "@/lib/prisma";

export const deleteClientRegister = async (clientId: string) => {
  const client = db.client.findUnique({
    where: {
      id: clientId,
    },
  });

  if (!client) throw new Error("Não existe um cliente registrado com este ID.");

  await db.client.delete({
    where: { id: clientId },
  });
};
