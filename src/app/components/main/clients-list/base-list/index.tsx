"use client";

import { Client } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getClientsList } from "@/actions/get-clients-list";
import { useClientsContext } from "@/contexts/clients-context";

import { ClientCard } from "../client-card";
import { LoadMoreButton } from "../load-more-button";

export const BaseList = () => {
  const { clients, setClients, cursor, setCursor } = useClientsContext();
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching } = useQuery<{
    clients: Client[];
    hasMore: boolean;
  }>({
    queryKey: ["clients", cursor],
    queryFn: () => getClientsList(cursor),
    staleTime: 1000 * 60, // 60 seconds
  });

  useEffect(() => {
    if (data) {
      setClients((prev) => [...prev, ...data.clients]);
      setHasMore(data.hasMore);
    }
  }, [data, setClients]);

  const handleLoadMore = () => {
    if (data && data.clients.length > 0) {
      const lastClientId = data.clients[data.clients.length - 1].id;
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
        hasMore={hasMore}
        handleLoadMore={handleLoadMore}
        isFetching={isFetching}
      />
    </section>
  );
};
