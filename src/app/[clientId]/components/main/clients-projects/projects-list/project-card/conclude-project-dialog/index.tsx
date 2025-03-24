import { Dialog } from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ConcludeProjectForm } from "./conclude-project-form";
import { UndoProjectConclusion } from "./undo-project-conclusion";

export const ConcludeProjectDialog = ({
  finishedProject,
  projectId,
}: {
  finishedProject: boolean;
  projectId: string;
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button className="flex-1">
        {finishedProject ? "Definir como inacabado" : "Concluir Projeto"}
      </Button>
    </DialogTrigger>
    <DialogContent className="px-10">
      <DialogHeader>
        <DialogTitle className="leading-tight">
          Você deseja marcar este projeto como{" "}
          {finishedProject ? "inacabado" : "concluído"}?
        </DialogTitle>
        <DialogDescription>
          Preencha os dados abaixo para definir o projeto como{" "}
          <span className="font-semibold">
            {finishedProject ? "INACABADO" : "CONCLUÍDO"}
          </span>
          . Não se preocupe! Caso mude de ideia, essa ação pode ser desfeita.
        </DialogDescription>
      </DialogHeader>
      {finishedProject ? (
        <UndoProjectConclusion projectId={projectId} />
      ) : (
        <ConcludeProjectForm projectId={projectId} />
      )}
    </DialogContent>
  </Dialog>
);
