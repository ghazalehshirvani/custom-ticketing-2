import "./App.css";
import "./index.css";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./scenes/login";
import Dashboard from "./scenes/dashboard";
import Ticket from "./scenes/ticket";
import Contacts from "./scenes/contacts";
import FAQ from "./scenes/faq";
import UserProfile from "./scenes/userPanel/userPanel";
import ChangePasswordPage from "./scenes/userPanel/changePswd";

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
            <Route path="/contacts" element={< Contacts />} />
            <Route path="/user-profile" element={<UserProfile/>} />
            <Route path="/change-password" element={<ChangePasswordPage/>}/>
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
  
}

export default App;
