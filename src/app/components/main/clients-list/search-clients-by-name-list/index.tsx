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
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery<Client[]>({
    queryKey: ["searchClients", cursor, clientName],
    queryFn: () => searchByName(clientName),
    staleTime: 1000 * 60, // 60 seconds
  });

  useEffect(() => {
    setIsLoading(isFetching);
  }, [isFetching, setIsLoading]);

  const handleLoadMore = () => {
    if (data && data.length > 0) {
      const lastClientId = data[data.length - 1].id;
      setCursor(lastClientId);
    }
  };

  const handleReturn = () => {
    setClientName("");
    queryClient.invalidateQueries({ queryKey: ["clients"] });
    queryClient.invalidateQueries({ queryKey: ["searchClients"] });
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
        {!data.length && !isFetching
          ? `Nenhum registro compatível com "${clientName}"`
          : `Registros com "${clientName}"`}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((client) => (
          <ClientCard client={client} key={client.id} />
        ))}
      </div>
      {!data.length && !isFetching && (
        <LoadMoreButton
          data={data}
          handleLoadMore={handleLoadMore}
          isFetching={isFetching}
        />
      )}
    </section>
  );
};
