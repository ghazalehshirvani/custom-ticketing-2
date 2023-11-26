import { Box, useTheme } from "@mui/material";
import Header from "../../components/header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="پایگاه دانش" subtitle="سوالات متداول" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            حل مشکل اتصال به ریموت دسکتاپ در ویندوز
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography >
          <span style={{ fontWeight: "bold" }}>۱. </span>تنظیمات فایروال را تغییر دهید.

            <br />
            <br />
            فایروال ویندوز یکی از رایج ترین دلایل مشکل اتصال به ریموت دسکتاپ است
            و اگر فایروال سیستم شما RDP را بلاک کند، شما به هیچ وجه نمی توانید
            به سیستم وریندوز ریموت متصل شوید. مخصوصاً اگر برای اولین بار است که
            از ریموت دسکتاپ استفاده می کنید، حتماً باید مراحل این روش را طی کنید
            چون ریموت دسکتاپ به طور پیش فرض در فایروال غیرفعال است. 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            سوال
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>راه حل</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
