import React, { createContext, ReactNode, useState } from "react";

type UserContextState = {
  name: string;
  setName: (name: string) => void;
};

const initialUserContext: UserContextState = {
  name: "",
  setName: () => {},
};

export const UserContext = createContext<UserContextState>(initialUserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState("");

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
};
