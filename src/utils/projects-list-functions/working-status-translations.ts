import { WorkingProgress } from "@prisma/client";

export const workingStatusTranslations: Record<WorkingProgress, string> = {
  AVAILABLE: "Disponível",
  FINISHED: "Finalizado",
  IN_PROGRESS: "Em progresso",
  REFUSED: "Recusado",
};
