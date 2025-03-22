import { WorkingProgress } from "@prisma/client";

export const clientStatus = ({
  status,
}: {
  status: WorkingProgress;
}): { status: string; color: string } => {
  if (status === "AVAILABLE")
    return { status: "Disponível", color: "text-green-500" };
  if (status === "FINISHED")
    return { status: "Finalizado", color: "text-blue-500" };
  if (status === "IN_PROGRESS")
    return { status: "Em progresso", color: "text-yellow-500" };
  if (status === "REFUSED")
    return { status: "Recusado", color: "text-red-500" };
  return { status: "-", color: "" };
};
