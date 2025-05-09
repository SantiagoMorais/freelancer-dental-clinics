"use client";
import React, { createContext, useContext, useState } from "react";

interface ISearchPostByTitle {
  clientName: string;
  setClientName: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchClientsMethodsContext = createContext<ISearchPostByTitle>({
  clientName: "",
  setClientName: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const SearchClientsMethodsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [clientName, setClientName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <SearchClientsMethodsContext.Provider
      value={{
        clientName,
        setClientName,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </SearchClientsMethodsContext.Provider>
  );
};

export const useSearchClientsMethods = () => {
  const context = useContext(SearchClientsMethodsContext);

  if (!context)
    throw new Error(
      "useSearchClientsMethods must be wrapped by SearchClientsMethodsProvider"
    );

  return context;
};
