import { Client } from "@prisma/client";

import { Separator } from "@/components/ui/separator";
import { clientStatus } from "@/utils/client-status";
import { clientsInfo } from "@/utils/clients-info";

import { ClientName } from "./client-name";

export const ClientsInfo = ({ client }: { client: Client }) => {
  const statusResponse = clientStatus({ status: client.workingProgress });

  return (
    <section className="bg-muted/50 border-muted flex w-full flex-1 flex-col items-center gap-4 rounded-lg border p-4">
      <ClientName name={client.companyName} />
      <p className={`w-full font-semibold ${statusResponse.color}`}>
        {statusResponse.status}
      </p>
      <div className="flex w-full flex-col gap-4">
        {clientsInfo({ client }).map((info) => (
          <>
            <p key={info.title}>
              <span className="font-semibold">{info.title}:</span> <br />
              {info.content}
            </p>
            <Separator />
          </>
        ))}
      </div>
    </section>
  );
};
