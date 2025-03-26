"use server";

import { WorkingProgress } from "@prisma/client";

import { IClientId } from "@/core/interfaces/client-and-project-id";
import { db } from "@/lib/prisma";

export const updateClientStatus = async ({
  clientId,
  status,
}: IClientId & { status: WorkingProgress }) => {
  const updatedClient = await db.client.update({
    where: {
      id: clientId,
    },
    data: {
      workingProgress: status,
    },
  });

  return updatedClient;
};
