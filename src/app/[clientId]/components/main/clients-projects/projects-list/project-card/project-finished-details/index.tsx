import { Separator } from "@/components/ui/separator";
import { IProjectFinishedDetails } from "@/core/interfaces/project-finished-details-props";
import { calculateTimeInterval } from "@/utils/projects-list-functions/calculate-time-interval";
import { formatDate } from "@/utils/projects-list-functions/format-date";

import { RatingDisplay } from "./rating-display";

export const ProjectFinishedDetails = ({
  project,
}: IProjectFinishedDetails) => (
  <>
    <Separator />
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <p className="bg-muted/50 border-muted-foreground/20 rounded-md border px-1 font-semibold">
          Data da entrega:{" "}
          <span className="font-normal">{formatDate(project.finishedAt)}</span>
        </p>
        <p className="bg-muted/50 border-muted-foreground/20 rounded-md border px-1 font-semibold">
          Entregue em:{" "}
          <span className="font-normal">
            {calculateTimeInterval({
              startDate: project.startedAt,
              endDate: project.finishedAt,
            })}
          </span>
        </p>
      </div>
      {project.review && (
        <p className="bg-muted/50 border-muted-foreground/20 rounded-md border px-1 font-semibold">
          Avaliação do cliente:{" "}
          <span className="font-normal">&quot;{project.review}&quot;</span>
        </p>
      )}
      {project.rating !== null && (
        <div className="flex w-full flex-col items-center">
          <RatingDisplay rating={project.rating} />
        </div>
      )}
    </div>
  </>
);
