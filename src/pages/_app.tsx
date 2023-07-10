import "../index.css";
import React from "react";
import { ThemeProvider } from "@/utils/theme";
import { Outlet } from "react-router";

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
