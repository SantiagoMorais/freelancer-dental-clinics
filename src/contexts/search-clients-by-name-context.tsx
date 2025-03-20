import { createContext, useContext, useState } from "react";

interface ISearchPostByTitle {
  clientName: string;
  setClientName: (title: string) => void;
}

const SearchClientsByNameContext = createContext<ISearchPostByTitle>({
  clientName: "",
  setClientName: () => {},
});

export const useSearchPostByTitle = () =>
  useContext(SearchClientsByNameContext);

export const SearchClientsByNameProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [clientName, setClientName] = useState<string>("");

  return (
    <SearchClientsByNameContext.Provider value={{ clientName, setClientName }}>
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
