import { listClients } from "@/actions/list-clients";

import { ClientCard } from "./client-card";

export const ListClient = async () => {
  const clients = await listClients();
  const content = () => {
    if (!clients.length)
      return (
        <p className="text-muted-foreground text-center text-lg">
          Nenhum cliente registrado
        </p>
      );
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <ClientCard client={client} key={client.id} />
        ))}
      </div>
    );
  };
  return (
    <section className="size-full max-w-(--breakpoint-2xl)">
      {content()}
    </section>
  );
};
