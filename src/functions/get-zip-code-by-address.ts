export const getZipCodeByAddress = async ({
  city,
  state,
  street,
}: {
  state: string;
  city: string;
  street: string;
}): Promise<{ cep: string }[]> => {
  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${state}/${city}/${street}/json/`
    );

    if (!response.ok) return [{ cep: "" }];

    const data: { cep: string }[] = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro interno do servidor. Não foi possível buscar o CEP.");
  }
};
