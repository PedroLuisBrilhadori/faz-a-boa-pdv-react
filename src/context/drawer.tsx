import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type DrawerCtx = {
  pathname: string;
  navigate: (route: string) => void;
};

export const DrawerContext = createContext({} as DrawerCtx);

export const DrawerProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  return (
    <DrawerContext.Provider value={{ navigate, pathname }}>
      {children}
    </DrawerContext.Provider>
  );
};
