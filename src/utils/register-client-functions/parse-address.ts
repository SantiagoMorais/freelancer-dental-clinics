export const parseAddress = (address: string) => {
  const addressRegex =
    /(.+?),\s*(\d+)\s*-\s*(.+?),\s*(.+?)\s*-\s*([A-Z]{2})(?:\s*\((.+)\))?/;
  const match = address.match(addressRegex);

  if (!match) {
    throw new Error("Invalid address format");
  }

  const [, street, addressNumber, neighborhood, city, state, complement] =
    match;

  return {
    street: street.trim(),
    addressNumber: addressNumber.trim(),
    neighborhood: neighborhood.trim(),
    city: city.trim(),
    state: state.trim(),
    complement: complement ? complement.trim() : undefined,
  };
};
