import React from "react";
import { UseGoogleFormReturn } from "../types";

const GoogleFormContext = React.createContext<UseGoogleFormReturn | null>(null);
const useGoogleFormContext = () => React.useContext(GoogleFormContext);

type GoogleFormProviderProps = {
  children: React.ReactNode;
} & UseGoogleFormReturn;

const GoogleFormProvider = ({
  children,
  ...other
}: GoogleFormProviderProps) => {
  return (
    <GoogleFormContext.Provider value={other}>
      {children}
    </GoogleFormContext.Provider>
  );
};

export { useGoogleFormContext, GoogleFormProvider };
