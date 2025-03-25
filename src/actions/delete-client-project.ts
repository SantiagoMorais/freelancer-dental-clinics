"use server";

import { db } from "@/lib/prisma";

export const deleteClientProject = async ({
  clientId,
  projectId,
}: {
  projectId: string;
  clientId: string;
}) => {
  const client = await db.client.findUnique({
    where: { id: clientId },
  });

  if (!client) throw new Error("There is no client with this ID");

  await db.clientProject.delete({
    where: { id: projectId, clientId },
  });
};
