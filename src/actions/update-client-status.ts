"use server";

import { WorkingProgress } from "@prisma/client";

import { db } from "@/lib/prisma";

export const updateClientStatus = async ({
  clientId,
  status,
}: {
  clientId: string;
  status: WorkingProgress;
}) => {
  console.log("Atualizando status:", { clientId, status }); // Log de depuração
  const updatedClient = await db.client.update({
    where: {
      id: clientId,
    },
    data: {
      workingProgress: status,
    },
  });

  console.log("Cliente atualizado:", updatedClient); // Log do resultado
  return updatedClient;
};
