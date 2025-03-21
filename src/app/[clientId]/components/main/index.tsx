"use client";

import { Client, ClientProject } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";

import { getClientDetails } from "@/actions/get-client-details";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ClientsInfo } from "./clients-info";
import { ClientsProjects } from "./clients-projects";

export const Main = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { data, isFetching } = useQuery<
    Client & { clientProjects: ClientProject[] }
  >({
    queryKey: ["clientDetails"],
    queryFn: () => getClientDetails({ clientId }),
    staleTime: 60 * 100, // 60 seconds
  });

  useEffect(() => {
    if (!isFetching) {
      if (!data) return redirect("/");
    }
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
    <main className="flex min-h-full w-full max-w-(--breakpoint-2xl) flex-1 flex-col gap-4 p-4 md:flex-row">
      <TooltipProvider>
        <ClientsInfo client={data} />
        <ClientsProjects clientProjects={data.clientProjects} />
      </TooltipProvider>
    </main>
  );
};
