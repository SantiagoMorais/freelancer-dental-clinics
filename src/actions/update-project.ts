"use server";

import { ClientProject } from "@prisma/client";

import { db } from "@/lib/prisma";

export const updateProject = async ({
  clientId,
  projectId,
  data,
}: {
  clientId: string;
  projectId: string;
  data: ClientProject;
}) => {
  const client = await db.client.findUnique({
    where: { id: clientId },
  });

  if (!client) throw new Error("There is no client registered with this ID");

  await db.clientProject.update({
    where: {
      id: projectId,
    },
    data: {
      projectName: data.projectName,
      createdAt: data.createdAt,
      paymentStatus: data.paymentStatus,
      serviceCategory: data.serviceCategory,
      servicePrice: data.servicePrice,
      rating: data.rating || null,
      review: data.review || null,
      githubUrl: data.githubUrl || null,
      projectUrl: data.projectUrl || null,
      finishedAt: data.finishedAt || null,
    },
  });
};
