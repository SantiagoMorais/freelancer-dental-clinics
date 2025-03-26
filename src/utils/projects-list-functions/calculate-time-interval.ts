import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const calculateTimeInterval = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date | null;
}): string => {
  if (!endDate) return "Data inválida";
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const diff = dayjs.duration(end.diff(start));

  const days = diff.days();
  const weeks = Math.floor(diff.asWeeks());
  const months = Math.floor(diff.asMonths());

  if (diff.asDays() < 1) return `Menos de um dia`;
  if (diff.asDays() < 7) return `${days} dia${days !== 1 ? "s" : ""}`;
  if (diff.asDays() < 28) {
    const remainingDays = days % 7;
    return `${weeks} semana${weeks !== 1 ? "s" : ""}${
      remainingDays
        ? ` e ${remainingDays} dia${remainingDays !== 1 ? "s" : ""}`
        : ""
    }`;
  }

  const remainingWeeks = Math.floor((diff.asDays() % 30) / 7);
  const remainingDays = days % 7;

  return `${months} mês${months !== 1 ? "es" : ""}${
    remainingWeeks
      ? `, ${remainingWeeks} semana${remainingWeeks !== 1 ? "s" : ""}`
      : ""
  }${
    remainingDays
      ? ` e ${remainingDays} dia${remainingDays !== 1 ? "s" : ""}`
      : ""
  }`;
};
