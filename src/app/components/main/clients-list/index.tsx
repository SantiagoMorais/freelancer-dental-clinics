"use client";

import { useSearchClientsByName } from "@/contexts/search-clients-by-name-context";

import { BaseList } from "./base-list";
import { SearchClientsByNameList } from "./search-clients-by-name-list";

export const ClientsList = () => {
  const { clientName } = useSearchClientsByName();

  return <>{clientName ? <SearchClientsByNameList /> : <BaseList />}</>;
};
