"use client";

import { Client } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getClientDetails } from "@/actions/get-client-details";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { clientStatus } from "@/utils/register-client-functions/client-status";
import { clientsInfo } from "@/utils/register-client-functions/clients-info";

import { ClientName } from "./client-name";
import { UpdateClientStatusDialog } from "./update-client-status-dialog";

export const ClientDetailsData = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const { data, isFetching } = useQuery({
    queryKey: ["clientDetails", { clientId }],
    queryFn: async () => getClientDetails({ clientId }),
    staleTime: 60 * 100, // 60 seconds
  });

  useEffect(() => {
    if (data) setClient(data);
  }, [data]);

  if (!client) return;

  const statusResponse = clientStatus({ status: client.workingProgress });

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-hidden">
      {isFetching ? (
        <p className="flex items-center gap-2">
          Carregando... <Loader2 className="animate-spin" />
        </p>
      ) : (
        <>
          <ClientName name={client.companyName} />
          <Separator />
          <div className="flex w-full flex-wrap items-center gap-4">
            <p className={`w-fit font-semibold ${statusResponse.color}`}>
              {statusResponse.status}
            </p>
            <UpdateClientStatusDialog />
          </div>
          <ScrollArea className="max-h-full w-full overflow-hidden md:max-h-full">
            <section className="flex size-full flex-col gap-3">
              {clientsInfo({ client }).map((info) => (
                <div key={info.title} className="flex w-full flex-col gap-2">
                  <div className="flex justify-between">
                    <p>
                      <span className="font-semibold">{info.title}:</span>{" "}
                      <br />
                      {info.content}
                    </p>
                  </div>
                  <Separator />
                </div>
              ))}
            </section>
          </ScrollArea>
        </>
      )}
    </div>
  );
};
