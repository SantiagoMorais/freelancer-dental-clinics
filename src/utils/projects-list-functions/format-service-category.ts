import { ServiceCategory } from "@prisma/client";

export const formatServiceCategory = (category: ServiceCategory): string => {
  if (category === "BLOG") return "Blog";
  if (category === "ECOMMERCE") return "E-Commerce";
  if (category === "INSTITUTIONAL") return "Institucional";
  if (category === "LANDING_PAGE") return "Landing-Page";
  if (category === "SCHEDULING") return "Agendamento";
  if (category === "OTHERS") return "Outros";
  return "Indefinido";
};
