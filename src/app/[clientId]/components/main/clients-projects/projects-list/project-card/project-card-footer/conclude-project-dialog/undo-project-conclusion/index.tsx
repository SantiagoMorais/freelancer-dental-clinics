"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { undoProjectConclusion } from "@/actions/undo-project-conclusion";
import { ConfirmAndCancelButtons } from "@/components/confirm-and-cancel-buttons";
import { IProjectId } from "@/core/interfaces/client-and-project-id";

export const UndoProjectConclusion = ({ projectId }: IProjectId) => {
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
    <ConfirmAndCancelButtons
      onClickFunction={handleUndoProjectConclusion}
      isLoading={isLoading}
      colors="secondary"
    />
  );
};
