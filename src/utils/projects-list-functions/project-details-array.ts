import {
  IProjectDetailsRequest,
  IProjectDetailsResponse,
} from "@/core/interfaces/project-details-array";

import { formatDate } from "./format-date";
import { formatNumberToBRL } from "./format-number-to-BRL";
import { formatPaymentStatus } from "./format-payment-status";
import { formatServiceCategory } from "./format-service-category";

export const projectDetails = ({
  project,
}: IProjectDetailsRequest): IProjectDetailsResponse[] => [
  {
    label: "Criado em",
    value: formatDate(project.createdAt),
  },
  {
    label: "Status do pagamento",
    value: formatPaymentStatus(project.paymentStatus).value,
    extraClass: formatPaymentStatus(project.paymentStatus).color,
  },
  {
    label: "Categoria",
    value: formatServiceCategory(project.serviceCategory),
  },
  {
    label: "Valor cobrado",
    value: formatNumberToBRL(project.servicePrice),
  },
];
