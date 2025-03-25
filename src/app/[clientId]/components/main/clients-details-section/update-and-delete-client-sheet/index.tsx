"use client";

import { Client } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getClientDetails } from "@/actions/get-client-details";

import { DeleteClientRegister } from "./delete-client-register";
import { UpdateClientInfoSheet } from "./update-client-info-sheet";

export const UpdateAndDeleteClientSheet = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const { data, isFetching } = useQuery({
    queryKey: ["clientDetailsForm", { clientId }],
    queryFn: async () => getClientDetails({ clientId }),
    staleTime: 60 * 100, // 60 seconds
  });

  useEffect(() => {
    if (data) setClient(data);
  }, [data]);

  if (!client) return;

  return (
    <div className="mt-auto flex w-full flex-wrap justify-center gap-4 md:w-fit">
      {isFetching ? (
        <p className="flex items-center gap-2">
          Carregando... <Loader2 className="animate-spin" />
        </p>
      ) : (
        <>
          <UpdateClientInfoSheet client={client} />
          <DeleteClientRegister client={client} />
        </>
      )}
    </div>
  );
};
