import dayjs from "dayjs";

export const formatDate = (date: Date | null): string => {
  if (!date) return "Data inválida";
  return dayjs(date).format("DD/MM/YYYY");
};
