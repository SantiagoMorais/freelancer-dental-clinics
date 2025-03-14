"use server";
import { TRegisterClientSchema } from "@/core/types/register-client-schema";
import { db } from "@/lib/prisma";

export const registerClient = async (data: TRegisterClientSchema) => {
  const client = await db.client.findUnique({
    where: { address: data.address },
  });

  if (client)
    throw new Error("Já existe um cliente registrado com este endereço.");

  await db.client.create({
    data: {
      address: data.address,
      companyName: data.companyName,
      openingHours: data.openingHours,
      phone: data.phone,
      workingProgress: "AVAILABLE",
      hasAnWebSite: data.hasAnWebSite,
    },
  });
};
