"use client";

import { Client } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { listClients } from "@/actions/list-clients";

import { ClientCard } from "./client-card";

export const ListClient = () => {
  const { data } = useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: listClients,
    staleTime: 1000 * 60, // 60 seconds
  });

  if (!data) return null;

  const content = () => {
    if (!data.length)
      return (
        <p className="text-muted-foreground text-center text-lg">
          Nenhum cliente registrado
        </p>
      );
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((client) => (
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
