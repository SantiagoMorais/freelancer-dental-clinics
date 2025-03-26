import { ClientProject } from "@prisma/client";

import { CardFooter } from "@/components/ui/card";

import { ConcludeProjectDialog } from "./conclude-project-dialog";
import { DeleteProjectDialog } from "./delete-project-dialog";

export const ProjectCardFooter = ({
  project,
}: {
  project: Pick<ClientProject, "finishedAt" | "id" | "projectName">;
}) => (
  <CardFooter className="flex flex-col justify-center gap-4">
    <div className="flex w-full flex-wrap gap-4 md:w-fit">
      <ConcludeProjectDialog
        projectId={project.id}
        finishedProject={project.finishedAt ? true : false}
      />
      <DeleteProjectDialog
        projectId={project.id}
        projectName={project.projectName}
      />
    </div>
  </CardFooter>
);
