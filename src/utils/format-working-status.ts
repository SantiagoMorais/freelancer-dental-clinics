import { $Enums } from "@prisma/client";

enum WorkingProgress {
  IN_PROGRESS = "IN_PROGRESS",
  REFUSED = "REFUSED",
  AVAILABLE = "AVAILABLE",
  FINISHED = "FINISHED",
}

interface IStatusResponse {
  status: string;
  color: string;
}

export const formatWorkingStatus = (
  status: $Enums.WorkingProgress
): IStatusResponse => {
  switch (status) {
    case WorkingProgress.IN_PROGRESS:
      return { status: "Em progresso", color: "text-yellow-500" };
    case WorkingProgress.REFUSED:
      return { status: "Recusado", color: "text-red-500" };
    case WorkingProgress.AVAILABLE:
      return { status: "Disponível", color: "text-green-500" };
    case WorkingProgress.FINISHED:
      return { status: "Finalizado", color: "text-blue-500" };
    default:
      throw new Error("Invalid status");
  }
};
