import "./App.css";
import "./index.css";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";

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

  return (
    <div className="app">
      <CustomSidebar isSidebar={isSidebar} texAlign="right" />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>
    </div>
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
    //     <div className="app">
    //       <CustomSidebar isSidebar={isSidebar} texAlign="right" />
    //       <main className="content">
    //         <Topbar setIsSidebar={setIsSidebar} />
    //         <Routes>
    //           <Route path="/" element={<Dashboard />} />
    //           <Route path="/ticket" element={<Ticket />} />
    //           <Route path="/faq" element={<FAQ />} />
    //         </Routes>
    //       </main>
    //     </div>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
  );
}

export default App;
