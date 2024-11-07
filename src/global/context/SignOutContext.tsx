import React, { createContext, useContext, ReactNode } from "react";

const SignOutContext = createContext<(() => void) | undefined>(undefined);

export const useSignOut = () => {
  const context = useContext(SignOutContext);
  if (!context) {
    throw new Error("useSignOut must be used within a SignOutProvider");
  }
  return context;
};

export const SignOutProvider: React.FC<{
  signOut: () => void;
  children: ReactNode;
}> = ({ signOut, children }) => (
  <SignOutContext.Provider value={signOut}>{children}</SignOutContext.Provider>
);
