import { ClientProject } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projectDetails } from "@/utils/projects-list-functions/project-details-array";

import { ProjectCardFooter } from "./project-card-footer";
import { ProjectFinishedDetails } from "./project-finished-details";
import { ProjectLink } from "./project-link";

export const ProjectCard = ({ project }: { project: ClientProject }) => (
  <Card key={project.id} className="mb-4 last-of-type:mb-0">
    <CardHeader>
      <CardTitle>{project.projectName}</CardTitle>
      <CardDescription
        className={`font-semibold ${project.finishedAt ? "text-green-500" : "text-red-500"}`}
      >
        {project.finishedAt ? "Finalizado" : "Em andamento"}
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {projectDetails({ project }).map((detail) => (
          <p
            className="bg-muted/50 border-muted-foreground/20 rounded-md border px-1 font-semibold"
            key={detail.label}
          >
            {detail.label}:{" "}
            <span
              className={`font-normal ${detail.extraClass && detail.extraClass}`}
            >
              {detail.value}
            </span>
          </p>
        ))}
        {project.githubUrl && (
          <ProjectLink
            content="Acessar repositório github"
            link={project.githubUrl}
          />
        )}
        {project.projectUrl && (
          <ProjectLink content="Acessar site" link={project.projectUrl} />
        )}
      </div>
      {project.finishedAt && <ProjectFinishedDetails project={project} />}
    </CardContent>
    <ProjectCardFooter project={project} />
  </Card>
);
