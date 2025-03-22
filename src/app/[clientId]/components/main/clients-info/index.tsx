import { Client } from "@prisma/client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { clientStatus } from "@/utils/register-client-functions/client-status";
import { clientsInfo } from "@/utils/register-client-functions/clients-info";

import { ClientName } from "./client-name";
import { DeleteClientRegister } from "./delete-client-register";
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
      <div className="mt-auto flex w-full flex-wrap justify-center gap-4 md:w-fit">
        <UpdateClientInfoSheet client={client} />
        <DeleteClientRegister client={client} />
      </div>
    </section>
  );
};
