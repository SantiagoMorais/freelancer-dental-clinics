"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { undoProjectConclusion } from "@/actions/undo-project-conclusion";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export const UndoProjectConclusion = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient();
  const { clientId } = useParams<{ clientId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUndoProjectConclusion = async () => {
    try {
      setIsLoading(true);
      await undoProjectConclusion({ clientId, projectId });
      queryClient.invalidateQueries({ queryKey: ["clientProjects"] });
      toast.success("Projeto editado para INACABADO com sucesso!");
    } catch (error) {
      if (process.env.NODE_ENV === "development")
        console.error("Error by editing project to not concluded:", error);
      toast.error(
        "Não foi possível editar o projeto para INACABADO. Por favor, tente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-4">
      <DialogClose asChild>
        <Button className="flex-1" variant="secondary">
          Cancelar
        </Button>
      </DialogClose>
      <Button
        variant="destructive"
        disabled={isLoading}
        onClick={() => handleUndoProjectConclusion()}
        className="flex-1"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Confirmar"}
      </Button>
    </div>
  );
};
