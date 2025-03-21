"use server";

import { ServiceCategory } from "@prisma/client";

import { TRegisterProjectSchema } from "@/core/types/register-project-schema";
import { db } from "@/lib/prisma";

interface IRegisterProject {
  clientId: string;
  data: TRegisterProjectSchema;
}

export const registerProject = async ({ clientId, data }: IRegisterProject) => {
  const client = await db.client.findUnique({
    where: { id: clientId },
  });

  if (!client) throw new Error("There is no client with this ID");

  await db.clientProject.create({
    data: {
      serviceCategory: data.serviceCategory as ServiceCategory,
      servicePrice: Number(data.servicePrice),
      clientId,
      projectName: data.projectName,
      githubUrl: data.githubUrl ?? "",
      projectUrl: data.projectUrl ?? "",
    },
  });
};
