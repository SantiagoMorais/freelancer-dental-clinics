"use server";

import { db } from "@/lib/prisma";

export const updateClientAsFavorite = async ({
  clientId,
  makeFavorite,
}: {
  clientId: string;
  makeFavorite: boolean;
}) => {
  const client = await db.client.findUnique({
    where: { id: clientId },
  });

  if (!client) throw new Error("There is no client registered with this ID");

  await db.client.update({
    where: { id: clientId },
    data: {
      favorite: makeFavorite,
    },
  });
};
