export const formatNumberToBRL = (value: number): string => {
  const result = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  return result;
};
