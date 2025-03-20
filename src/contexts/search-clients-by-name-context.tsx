"use client";
import React, { createContext, useContext, useState } from "react";

interface ISearchPostByTitle {
  clientName: string;
  setClientName: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchClientsByNameContext = createContext<ISearchPostByTitle>({
  clientName: "",
  setClientName: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const useSearchPostByTitle = () =>
  useContext(SearchClientsByNameContext);

export const SearchClientsByNameProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [clientName, setClientName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <SearchClientsByNameContext.Provider
      value={{ clientName, setClientName, isLoading, setIsLoading }}
    >
      {children}
    </SearchClientsByNameContext.Provider>
  );
};

export const useSearchClientsByName = () => {
  const context = useContext(SearchClientsByNameContext);

  if (!context)
    throw new Error(
      "useSearchClientsByName must be wrapped by SearchClientsByNameProvider"
    );

  return context;
};
