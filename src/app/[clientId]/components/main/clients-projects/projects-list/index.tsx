import { ClientProject } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { calculateTimeInterval } from "@/utils/projects-list-functions/calculate-time-interval";
import { formatDate } from "@/utils/projects-list-functions/format-date";
import { formatNumberToBRL } from "@/utils/projects-list-functions/format-number-to-BRL";
import { formatPaymentStatus } from "@/utils/projects-list-functions/format-payment-status";
import { formatServiceCategory } from "@/utils/projects-list-functions/format-service-category";

import { ConcludeProjectSheet } from "./conclude-project-dialog";

export const ProjectsList = ({ projects }: { projects: ClientProject[] }) => (
  <section className="flex w-full flex-col gap-4">
    {projects.map((project) => (
      <Card key={project.id}>
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
            <p className="bg-muted/50 border-muted-foreground/20 rounded-md border px-1 font-semibold">
              Criado em:{" "}
              <span className="font-normal">
                {formatDate(project.createdAt)}
              </span>
            </p>
            <p className="bg-muted/50 border-muted-foreground/20 rounded-md border px-1 font-semibold">
              Status do pagamento:{" "}
              <span
                className={`font-normal ${formatPaymentStatus(project.paymentStatus).color}`}
              >
                {formatPaymentStatus(project.paymentStatus).value}
              </span>
            </p>
            <p className="bg-muted/50 border-muted-foreground/20 rounded-md border px-1 font-semibold">
              Categoria:{" "}
              <span className="font-normal">
                {formatServiceCategory(project.serviceCategory)}
              </span>
            </p>
            <p className="bg-muted/50 border-muted-foreground/20 rounded-md border px-1 font-semibold">
              Valor cobrado:{" "}
              <span className="font-normal">
                {formatNumberToBRL(project.servicePrice)}
              </span>
            </p>
            {project.githubUrl && (
              <a
                target="_blank"
                href={project.githubUrl}
                className="text-primary hover:border-primary w-fit border-b border-transparent px-1 font-semibold duration-200"
              >
                Acessar Repositório GitHub
              </a>
            )}
            {project.projectUrl && (
              <a
                target="_blank"
                href={project.projectUrl}
                className="text-primary hover:border-primary w-fit border-b border-transparent px-1 font-semibold duration-200"
              >
                Acessar Site
              </a>
            )}
          </div>
          {project.finishedAt && (
            <div className="space-y-4">
              <Separator />
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                <p className="bg-muted/50 border-muted-foreground/20 rounded-md border px-1 font-semibold">
                  Data da entrega:{" "}
                  <span className="font-normal">
                    {formatDate(project.finishedAt)}
                  </span>
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
                {project.rating && (
                  <p className="bg-muted/50 border-muted-foreground/20 rounded-md border px-1 font-semibold">
                    Nota do cliente:{" "}
                    <span className="font-normal">{project.rating}</span>
                  </p>
                )}
              </div>
              {project.review && (
                <p className="bg-muted/50 border-muted-foreground/20 rounded-md border px-1 font-semibold">
                  Avaliação do cliente:{" "}
                  <span className="font-normal">{project.review}</span>
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-4">
          <div className="flex w-full flex-wrap gap-4 md:w-fit">
            <ConcludeProjectSheet
              finishedProject={project.finishedAt ? true : false}
            />
            <Button className="flex-1" variant="destructive">
              Excluir projeto
            </Button>
          </div>
        </CardFooter>
      </Card>
    ))}
  </section>
);
