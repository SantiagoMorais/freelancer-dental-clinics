"use client";

import { Client } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";

import { getClientDetails } from "@/actions/get-client-details";

import { ClientsInfo } from "./clients-info";

export const Main = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { data, isFetching } = useQuery<Client>({
    queryKey: ["clientDetails"],
    queryFn: () => getClientDetails({ clientId }),
    staleTime: 60 * 100, // 60 seconds
  });

  useEffect(() => {
    if (!isFetching) {
      if (!data) return redirect("/");
    }

    console.log(data);
  }, [isFetching, data]);

  if (isFetching)
    return (
      <p className="text-muted-foreground flex items-center gap-2 text-xl">
        <Loader2 className="animate-spin" />
        Carregando...
      </p>
    );

  if (!data) return;

  return (
    <main className="flex min-h-full w-full flex-1 flex-col p-4">
      <ClientsInfo client={data} />
    </main>
  );
};
