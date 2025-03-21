import { Client } from "@prisma/client";

import { getZipCodeByAddress } from "@/functions/get-zip-code-by-address";

import { parseAddress } from "./parse-address";

export const updateClientInfoDefaultValues = async ({
  client,
}: {
  client: Client;
}) => {
  const { street, addressNumber, neighborhood, city, state, complement } =
    parseAddress(client.address);

  const zipCode = await getZipCodeByAddress({ city, state, street });
  console.log(zipCode);

  return {
    companyName: client.companyName,
    street,
    addressNumber,
    neighborhood,
    city,
    state,
    complement: complement || "",
    mobilePhoneNumber: client.mobilePhoneNumber || "",
    phoneNumber: client.phoneNumber || "",
    openingHours: client.openingHours,
    socialMedia: client.socialMedia || "",
    hasAnWebSite: client.hasAnWebSite,
    notes: client.notes || "",
    zipCode: zipCode[0].cep || "",
  };
};
