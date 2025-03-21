import { Client } from "@prisma/client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { clientStatus } from "@/utils/client-status";
import { clientsInfo } from "@/utils/clients-info";

import { ClientName } from "./client-name";
import { UpdateClientInfoSheet } from "./update-client-info-sheet";

export const ClientsInfo = ({ client }: { client: Client }) => {
  const statusResponse = clientStatus({ status: client.workingProgress });

  return (
    <section className="bg-muted/50 border-muted flex w-full flex-col items-center gap-4 rounded-lg border p-4 md:flex-1 md:p-6">
      <ClientName name={client.companyName} />
      <p className={`w-full font-semibold ${statusResponse.color}`}>
        {statusResponse.status}
      </p>
      <ScrollArea className="h-fit w-full md:max-h-full">
        <section className="flex size-full flex-col gap-3">
          {clientsInfo({ client }).map((info) => (
            <div key={info.title} className="flex w-full flex-col gap-2">
              <div className="flex justify-between">
                <p>
                  <span className="font-semibold">{info.title}:</span> <br />
                  {info.content}
                </p>
              </div>
              <Separator />
            </div>
          ))}
        </section>
      </ScrollArea>
      <UpdateClientInfoSheet client={client} />
    </section>
  );
};
