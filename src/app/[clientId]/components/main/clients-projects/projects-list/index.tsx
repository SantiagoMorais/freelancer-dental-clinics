"use client";

import { ClientProject } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getClientProjects } from "@/actions/get-client-projects";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ProjectCard } from "./project-card";

export const ProjectsList = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const { data, isFetching } = useQuery<ClientProject[]>({
    queryKey: ["clientProjects"],
    queryFn: () => getClientProjects({ clientId }),
    staleTime: 60 * 100, // 60 seconds
  });

  useEffect(() => {
    if (data) setProjects(data);
  }, [data, projects]);

  const content = () => {
    if (isFetching)
      return (
        <p className="flex items-center justify-center gap-2 text-center">
          Carregando... <Loader2 className="animate-spin" />
        </p>
      );
    if (projects.length === 0)
      return <p className="text-center">Nenhum Projeto Iniciado</p>;

    return (
      <ScrollArea className="flex h-full w-full flex-col gap-4 overflow-auto rounded-lg">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ScrollArea>
    );
  };

  return (
    <section className="w-full flex-1 overflow-hidden">{content()}</section>
  );
};
