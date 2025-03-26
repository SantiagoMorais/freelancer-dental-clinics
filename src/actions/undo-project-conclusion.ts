"use server";

import { IClientAndProjectId } from "@/core/interfaces/client-and-project-id";
import { db } from "@/lib/prisma";

export const undoProjectConclusion = async ({
  projectId,
  clientId,
}: IClientAndProjectId) => {
  const client = await db.client.findUnique({
    where: { id: clientId },
  });

  if (!client) throw new Error("There is no client registered with this ID");

  await db.clientProject.update({
    where: {
      id: projectId,
    },
    data: {
      finishedAt: null,
      rating: null,
      review: null,
    },
  });
};
