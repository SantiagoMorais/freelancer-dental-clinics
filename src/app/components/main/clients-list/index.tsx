"use client";

import { useSearchClientsMethods } from "@/contexts/search-clients-methods-context";

import { BaseList } from "./base-list";
import { SearchClientsByNameList } from "./search-clients-by-name-list";

export const ClientsList = () => {
  const { clientName } = useSearchClientsMethods();

  return <>{clientName ? <SearchClientsByNameList /> : <BaseList />}</>;
};
