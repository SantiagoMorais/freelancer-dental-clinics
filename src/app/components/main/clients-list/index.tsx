"use client";

import { useSearchClientsByName } from "@/contexts/search-clients-by-name-context";

import { BaseList } from "./base-list";
import { SearchClientsByNameList } from "./search-by-name-list";

export const ClientsList = () => {
  const { clientName } = useSearchClientsByName();

  return <>{clientName ? <SearchClientsByNameList /> : <BaseList />}</>;
};
