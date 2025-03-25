import { ClientProject } from "@prisma/client";
import { Dialog } from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DeleteProjectForm } from "./delete-project-form";

export const DeleteProjectDialog = ({
  project,
}: {
  project: ClientProject;
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button className="flex-1" variant="destructive">
        Excluir projeto
      </Button>
    </DialogTrigger>
    <DialogContent className="px-10">
      <DialogHeader>
        <DialogTitle className="leading-tight">
          Deseja excluir este projeto?
        </DialogTitle>
        <DialogDescription>
          Essa ação não pode ser desfeita e uma vez excluído, todos os dados
          relacionados a este projeto serão perdidos.
          <br />
          Para concluir a exclusão digite o texto abaixo:
        </DialogDescription>
      </DialogHeader>
      <DeleteProjectForm
        projectId={project.id}
        projectName={project.projectName}
      />
    </DialogContent>
  </Dialog>
);
