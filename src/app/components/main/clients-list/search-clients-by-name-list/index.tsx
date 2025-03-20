"use client";
import { Client } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Undo2 } from "lucide-react";
import { useEffect, useState } from "react";

import { searchByName } from "@/actions/search-by-name";
import { Button } from "@/components/ui/button";
import { useSearchClientsByName } from "@/contexts/search-clients-by-name-context";

import { ClientCard } from "../client-card";
import { LoadMoreButton } from "../load-more-button";

export const SearchClientsByNameList = () => {
  const { clientName, setClientName, setIsLoading } = useSearchClientsByName();

  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [clients, setClients] = useState<Client[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery<{
    clients: Client[];
    hasMore: boolean;
  }>({
    queryKey: ["searchClients", cursor, clientName],
    queryFn: () => searchByName(clientName, cursor),
    staleTime: 1000 * 60, // 60 seconds
  });

  useEffect(() => {
    if (data) {
      setClients((prev) => {
        const newClients = data.clients.filter(
          (newClient) => !prev.some((client) => client.id === newClient.id)
        );
        return [...prev, ...newClients];
      });

      setHasMore(data.hasMore);
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(isFetching);
  }, [isFetching, setIsLoading]);

  const handleLoadMore = () => {
    if (data && data.clients.length > 0) {
      const lastClientId = data.clients[data.clients.length - 1].id;
      setCursor(lastClientId);
    }
  };

  const handleReturn = () => {
    setClientName("");
    queryClient.invalidateQueries({ queryKey: ["clients"] });
    queryClient.invalidateQueries({ queryKey: ["searchClients"] });
    setClients([]);
    setCursor(undefined);
  };

  if (!data) return;

  return (
    <section className="flex size-full max-w-(--breakpoint-2xl) flex-col items-center justify-center gap-4">
      {clientName?.length && (
        <Button variant="ghost" onClick={handleReturn}>
          Retornar <Undo2 />
        </Button>
      )}
      <p className="text-muted-foreground text-center text-lg">
        {!clients.length && !isFetching
          ? `Nenhum registro compatível com "${clientName}"`
          : `Registros com "${clientName}"`}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <ClientCard client={client} key={client.id} />
        ))}
      </div>
      {data && data.clients.length > 0 && (
        <LoadMoreButton
          hasMore={hasMore}
          handleLoadMore={handleLoadMore}
          isFetching={isFetching}
        />
      )}
    </section>
  );
};
