import { ClientProject } from "@prisma/client";

import { Button } from "@/components/ui/button";

export const ClientsProjects = ({
  clientProjects,
}: {
  clientProjects: ClientProject[];
}) => {
  return (
    <section className="bg-muted/50 border-muted flex w-full flex-col items-center gap-4 rounded-lg border p-4">
      <h2 className="border-secondary/50 truncate border-b text-center text-xl font-semibold">
        Projetos do cliente
      </h2>
      {!clientProjects.length ? <p>Nenhum Projeto Iniciado</p> : <></>}
      <Button>Registrar projeto</Button>
    </section>
  );
};
