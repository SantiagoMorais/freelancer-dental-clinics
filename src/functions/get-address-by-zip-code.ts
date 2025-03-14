export interface IAddress {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export const getAddressByZipCode = async (
  zipCode: string
): Promise<IAddress> => {
  const formatedZipCode = zipCode.replace(/-/g, "");

  try {
    const response = await fetch(`https://viacep.com.br/ws/${formatedZipCode}/json/`);

    if (!response.ok) throw new Error("Falha ao procurar endereço.");

    const data: IAddress = await response.json();

    if (data.erro) throw new Error("CEP inválido.");

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Erro interno do servidor. Não foi possível buscar o endereço."
    );
  }
};
