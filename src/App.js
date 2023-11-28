import "./App.css";
import "./index.css";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useEffect, useState } from "react";

import Login from "./scenes/login";
import Dashboard from "./scenes/dashboard";
import Ticket from "./scenes/ticket";
import { Routes, Route } from "react-router-dom";

import FAQ from "./scenes/faq";

function App() {
  const [theme, colorMode] = useMode();
 
  const [isUserLogin, setIsUserLogin] = useState(false);

  useEffect(() => {
    const date = new Date();
    if (localStorage.getItem("accessToken")) {
      setIsUserLogin(true);
    }
    if (date.getTime() > localStorage.getItem("tokenExpiration")) {
      setIsUserLogin(false);
      localStorage.clear("accessToken");
    }
  }, [localStorage]);

  return (

    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
  
}

export default App;
