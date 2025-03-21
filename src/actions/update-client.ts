"use server";
import { db } from "@/lib/prisma";

export const updateClient = async (data: {
  id: string;
  companyName: string;
  address: string;
  hasAnWebSite: boolean;
  openingHours: string;
  socialMedia?: string;
  notes?: string;
  mobilePhoneNumber?: string;
  phoneNumber?: string;
}) => {
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
