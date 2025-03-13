"use client";
import { createContext, useContext, useState } from "react";

export enum ContentType {
  Register = "register",
  Search = "search",
}

interface IChangeContentContext {
  content: ContentType;
  handleContent: (content: ContentType) => void;
}

export const ChangeContentContext = createContext<IChangeContentContext>({
  content: ContentType.Register,
  handleContent: () => {},
});

export const ChangeContentProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [content, setContent] = useState<ContentType>(ContentType.Register);

  const handleContent = (content: ContentType) => {
    setContent(content);
  };

  return (
    <ChangeContentContext.Provider value={{ handleContent, content }}>
      {children}
    </ChangeContentContext.Provider>
  );
};

export const useChangeContent = () => {
  const context = useContext(ChangeContentContext);

  if (!context)
    throw new Error(
      "useChangeContent must be wrapped by a ChangeContentProvider"
    );

  return context;
};
