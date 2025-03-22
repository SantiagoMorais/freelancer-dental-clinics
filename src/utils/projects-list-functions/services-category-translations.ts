import { ServiceCategory } from "@prisma/client";

export const serviceCategoryTranslations: Record<ServiceCategory, string> = {
  INSTITUTIONAL: "Institucional",
  ECOMMERCE: "E-commerce",
  SCHEDULING: "Agendamento",
  BLOG: "Blog",
  LANDING_PAGE: "Landing Page",
  OTHERS: "Outros",
};
