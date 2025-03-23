import { ClientProject } from "@prisma/client";

import { ProjectsList } from "./projects-list";
import { RegisterClientProjectsSheet } from "./register-client-projects-sheet";

export const ClientsProjects = ({
  clientProjects,
}: {
  clientProjects: ClientProject[];
}) => (
  <section className="bg-muted/50 border-muted flex w-full flex-1 flex-col items-center gap-4 overflow-hidden rounded-lg border p-4 md:flex-1 md:p-6">
    <h2 className="border-secondary/50 truncate border-b text-center text-xl font-semibold">
      Projetos do cliente
    </h2>
    {!clientProjects.length ? (
      <p>Nenhum Projeto Iniciado</p>
    ) : (
      <ProjectsList projects={clientProjects} />
    )}
    <RegisterClientProjectsSheet />
  </section>
);
