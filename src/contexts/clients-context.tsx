"use client";

import { Client } from "@prisma/client";
import React, { createContext, useContext, useState } from "react";

interface IClientsContext {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  cursor: string | undefined;
  setCursor: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ClientsContext = createContext<IClientsContext>({
  clients: [],
  setClients: () => {},
  cursor: undefined,
  setCursor: () => {},
});

export const ClientsProvider = ({ children }: React.PropsWithChildren) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  return (
    <ClientsContext.Provider value={{ clients, setClients, cursor, setCursor }}>
      {children}
    </ClientsContext.Provider>
  );
};

export const useClientsContext = () => {
  const context = useContext(ClientsContext);
  if (!context)
    throw new Error("useClientsContext must be wrapped by a ClientsProvider");
  return context;
};
