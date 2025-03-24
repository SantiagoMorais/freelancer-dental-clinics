"use server";

import { db } from "@/lib/prisma";

interface IUndoProjectConclusion {
  clientId: string;
  projectId: string;
}

export const undoProjectConclusion = async ({
  projectId,
  clientId,
}: IUndoProjectConclusion) => {
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
