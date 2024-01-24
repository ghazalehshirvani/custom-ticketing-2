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
import { kbURL, kbCategoriesURL } from "../api/axios";
import {MenuItem, Select} from "@mui/material";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [kbArray, setKbArray] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        setKbArray(data["results"]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchKB();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(kbCategoriesURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data["results"]);
        setCategories(data["results"]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

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
          {/* <div>
            <Typography variant="h6">فیلتر :</Typography>
            <Select
              value={selectedCategory}
              onChange={(e) => handleCategorySelect(e.target.value)}
            >
              <MenuItem value={null}>همه دسته ها</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </div> */}
          {kbArray
            // .filter(
            //   (kb) => !selectedCategory || kb.category === selectedCategory
            // )
            .map((kb, index) => (
              <>
                <Accordion key={index} defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box display="flex" flexDirection="column">
                      {kb.title && (
                        <Typography
                          color={colors.greenAccent[500]}
                          variant="h5"
                        >
                          {kb.title}
                        </Typography>
                      )}
                      {kb.author["username"] && (
                        <Typography color={colors.blueAccent[300]} variant="h6">
                          {kb.author["username"]}
                        </Typography>
                      )}
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {kb.attachment && (
                      <img
                        src={kb.attachment}
                        alt="Attachment"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    )}
                    <Typography
                      dangerouslySetInnerHTML={renderHTML(kb.content)}
                    />
                  </AccordionDetails>
                </Accordion>
              </>
            ))}
        </Box>
      </div>
    </div>
  );
};

export default FAQ;
