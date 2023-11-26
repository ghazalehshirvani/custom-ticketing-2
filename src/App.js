import "./App.css";
import "./index.css";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useEffect, useState } from "react";

import Login from "./scenes/login";
import DepartmentList from "./scenes/departments";
import Dashboard from "./scenes/dashboard";
import Ticket from "./scenes/ticket";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Topbar from "./scenes/global/TopBar";
import CustomSidebar from "./scenes/global/SideBar";
import FAQ from "./scenes/faq";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
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
    // <div className="app">
    //   <CustomSidebar isSidebar={isSidebar} texAlign="right" />
    //   <main className="content">
    //     <Topbar setIsSidebar={setIsSidebar} />
    //     <Routes>
    //       <Route path="/" element={<Dashboard />} />
    //       <Route path="/ticket" element={<Ticket />} />
    //       <Route path="/faq" element={<FAQ />} />
    //       <Route path="/login" element={<Login />} />
    //     </Routes>
    //   </main>
    // </div>
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <CustomSidebar isSidebar={isSidebar} texAlign="right" />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
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
