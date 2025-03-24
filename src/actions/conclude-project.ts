"use server";

import { TConcludeProjectSchema } from "@/core/types/conclude-project-schema";
import { db } from "@/lib/prisma";

interface IConcludeProject extends TConcludeProjectSchema {
  clientId: string;
  projectId: string;
}

export const concludeProject = async ({
  finishedAt,
  rating,
  review,
  clientId,
  projectId,
}: IConcludeProject) => {
  const client = await db.client.findUnique({
    where: { id: clientId },
  });

  if (!client) throw new Error("There is no client registered with this ID");

  await db.clientProject.update({
    where: {
      id: projectId,
    },
    data: {
      finishedAt,
      rating,
      review,
    },
  });
};
