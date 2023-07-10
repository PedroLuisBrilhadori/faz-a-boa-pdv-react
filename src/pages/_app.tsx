import "../index.css";
import React from "react";
import { ThemeProvider } from "@/utils/theme";
import { Outlet } from "react-router";
import { AuthProvider } from "@/context";

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
