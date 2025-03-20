"use client";

import { Client } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getClientsList } from "@/actions/get-clients-list";
import { useClientsContext } from "@/contexts/clients-context";

import { ClientCard } from "../client-card";
import { LoadMoreButton } from "../load-more-button";

export const BaseList = () => {
  const { clients, setClients, cursor, setCursor } = useClientsContext();

  const { data, isFetching } = useQuery<Client[]>({
    queryKey: ["clients", cursor],
    queryFn: () => getClientsList(cursor),
    staleTime: 1000 * 60, // 60 seconds
  });

  useEffect(() => {
    if (data)
      setClients((prev) => {
        const newClients = data.filter(
          (newClient) => !prev.some((client) => client.id === newClient.id)
        );
        return [...prev, ...newClients];
      });
  }, [data, setClients]);

  const handleLoadMore = () => {
    if (data && data.length > 0) {
      const lastClientId = data[data.length - 1].id;
      setCursor(lastClientId);
    }
  };

  if (!clients.length && !isFetching)
    return (
      <p className="text-muted-foreground text-center text-lg">
        Nenhum cliente registrado
      </p>
    );

  return (
    <section className="size-full max-w-(--breakpoint-2xl)">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <ClientCard client={client} key={client.id} />
        ))}
      </div>
      <LoadMoreButton
        data={data}
        handleLoadMore={handleLoadMore}
        isFetching={isFetching}
      />
    </section>
  );
};
