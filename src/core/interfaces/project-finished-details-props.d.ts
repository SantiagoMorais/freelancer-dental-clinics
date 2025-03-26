import { ClientProject } from "@prisma/client";

export interface IProjectFinishedDetails {
  project: Pick<
    ClientProject,
    "finishedAt" | "startedAt" | "review" | "rating"
  >;
}
