import { ClientProject } from "@prisma/client";

import { ScrollArea } from "@/components/ui/scroll-area";

import { ProjectCard } from "./project-card";

export const ProjectsList = ({ projects }: { projects: ClientProject[] }) => (
  <section className="w-full flex-1 overflow-hidden">
    <ScrollArea className="flex h-full w-full flex-col gap-4 overflow-auto rounded-lg">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ScrollArea>
  </section>
);
