import { Box, useTheme } from "@mui/material";
import Header from "../../components/header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomSidebar from "../global/SideBar";
import Topbar from "../global/TopBar";
import { kbURL } from "../api/axios";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [kbArray, setKbArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date();
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    if (date.getTime() > localStorage.getItem("tokenExpiration")) {
      localStorage.clear("accessToken");
      navigate("/login");
    }
  }, [localStorage]);

  useEffect(() => {
    const fetchKB = async () => {
      try {
        const response = await fetch(kbURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch KB: ${response.statusText}`);
        }

        const data = await response.json();
        setKbArray(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchKB();
  }, []);

  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div className="pageContainer">
      <CustomSidebar isSidebar={isSidebar} texAlign="right" />
      <div className="dataContainer">
        <Topbar setIsSidebar={setIsSidebar} />

        <Box m="20px">
          <Header title="پایگاه دانش" subtitle="سوالات متداول" />

          {kbArray.map((kb, i) => (
            <Accordion key={i} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" flexDirection="column">
                  <Typography color={colors.greenAccent[500]} variant="h5">
                    {kb.title}
                  </Typography>
                  <Typography color={colors.blue[500]} variant="h6">
                    {kb.author}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {kb.attachment&& (
                  <img
                    src={kb.attachment}
                    alt="Attachment"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                )}
                <Typography dangerouslySetInnerHTML={renderHTML(kb.content)} />
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default FAQ;
