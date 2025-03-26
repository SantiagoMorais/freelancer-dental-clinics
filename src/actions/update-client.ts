"use server";
import { IUpdateClientAction } from "@/core/interfaces/update-client-action";
import { db } from "@/lib/prisma";

export const updateClient = async (data: IUpdateClientAction) => {
  await db.client.update({
    where: { id: data.id },
    data: {
      companyName: data.companyName,
      address: data.address,
      hasAnWebSite: data.hasAnWebSite,
      openingHours: data.openingHours,
      socialMedia: data.socialMedia || null,
      notes: data.notes || null,
      mobilePhoneNumber: data.mobilePhoneNumber || null,
      phoneNumber: data.phoneNumber || null,
    },
  });
};
