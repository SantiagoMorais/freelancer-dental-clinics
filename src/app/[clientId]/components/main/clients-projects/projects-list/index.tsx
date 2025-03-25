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
  const [projects, setProjects] = useState<ClientProject[] | null>(null);
  const { data, isFetching } = useQuery<ClientProject[]>({
    queryKey: ["clientProjects"],
    queryFn: async () => getClientProjects({ clientId }),
    staleTime: 60 * 100, // 60 seconds
  });

  useEffect(() => {
    if (data) setProjects(data);
  }, [data]);

  const content = () => {
    if (!projects)
      return <p>Não foi possível encontrar os dados dos projetos</p>;
    if (projects.length === 0) return <p>Nenhum Projeto Iniciado</p>;
    if (isFetching)
      return (
        <p className="flex items-center gap-2">
          Carregando... <Loader2 className="animate-spin" />
        </p>
      );

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
