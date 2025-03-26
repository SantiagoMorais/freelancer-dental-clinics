import { Separator } from "@/components/ui/separator";

import { ProjectsList } from "./projects-list";
import { RegisterClientProjectsSheet } from "./register-client-projects-sheet";

export const ClientsProjects = () => (
  <section className="bg-muted/50 border-muted flex min-h-100 w-full flex-1 flex-col items-center gap-4 overflow-hidden rounded-lg border p-4 md:min-h-auto md:flex-1 md:p-6">
    <h2 className="bg-secondary/50 w-fit truncate rounded-md px-2 py-1 pt-0 text-center text-xl font-semibold">
      Projetos do cliente
    </h2>
    <Separator />
    <ProjectsList />
    <RegisterClientProjectsSheet />
  </section>
);
