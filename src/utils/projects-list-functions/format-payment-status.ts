import { PaymentStatus } from "@prisma/client";

interface IFormatPaymentStatus {
  value: string;
  color: string;
}

export const formatPaymentStatus = (
  status: PaymentStatus
): IFormatPaymentStatus => {
  if (status === "PENDING") return { value: "Pendente", color: "text-red-500" };
  if (status === "PAID") return { value: "Pago", color: "text-green-500" };
  if (status === "PARTIAL")
    return { value: "Parcialmente pago", color: "text-yellow-500" };
  return { value: "Indefinido", color: "text-orange-500" };
};
