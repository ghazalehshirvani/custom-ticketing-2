import { Box, Button, TextField, colors, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import { Select, MenuItem, FormControl, InputLabel, Grid } from "@mui/material";
import { tokens } from "../../theme";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
import "./ticket.css";
import { useNavigate } from "react-router-dom";
import CustomSidebar from "../global/SideBar";
import Topbar from "../global/TopBar";
import { ticketURL } from '../api/axios'

const Ticket = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const response = await fetch(ticketURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: values["subject"],
          department: values["department"],
          section: values["section"],
          priority: values["priority"],
          explanation: values["explanation"],
        }),
      });

      if (response.ok) {
        const result = await response.json();

        console.log(result);
      } else {
        console.error("Ticketing failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isSidebar, setIsSidebar] = useState(true);
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

  const [value, setValue] = useState("");
  return (
    <div className="pageContainer">
      <CustomSidebar isSidebar={isSidebar} texAlign="right" />
      <div className="dataContainer">
        <Topbar setIsSidebar={setIsSidebar} />

        <Box m="20px" direction="rtl">
          <Header title="ایجاد تیکت جدید" />

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                    direction: "rtl",
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    placeholder="موضوع"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.subject}
                    name="subject"
                    error={!!touched.subject && !!errors.subject}
                    helperText={touched.subject && errors.subject}
                    sx={{ gridColumn: "span 2", direction: "rtl" }}
                  />

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gridColumn: "span 6",
                      gap: "10px",
                      width: "100%",
                      paddingBottom: "10px",
                    }}
                  >
                    <Box>
                      <InputLabel
                        sx={{ textAlign: "right", paddingTop: "15px" }}
                      >
                        دپارتمان
                      </InputLabel>
                      <Select
                        variant="filled"
                        value={values.department}
                        onChange={handleChange}
                        name="department"
                        sx={{ width: "100%", direction: "rtl" }}
                      >
                        <MenuItem value="IT" sx={{ direction: "rtl" }}>
                          آی تی
                        </MenuItem>
                        <MenuItem value="Finance" sx={{ direction: "rtl" }}>
                          مالی
                        </MenuItem>
                      </Select>
                    </Box>
                    <Box>
                      <InputLabel
                        sx={{ textAlign: "right", paddingTop: "15px" }}
                      >
                        بخش
                      </InputLabel>
                      <Select
                        variant="filled"
                        value={values.section}
                        onChange={handleChange}
                        name="section"
                        sx={{ width: "100%", direction: "rtl" }}
                      >
                        <MenuItem value="IT-Software" sx={{ direction: "rtl" }}>
                          آی تی - نرم افزار
                        </MenuItem>
                        <MenuItem value="IT-Security" sx={{ direction: "rtl" }}>
                          آی تی - امنیت
                        </MenuItem>
                        <MenuItem value="IT-Hardware" sx={{ direction: "rtl" }}>
                          آی تی - سخت افزار
                        </MenuItem>
                      </Select>
                    </Box>

                    <Box>
                      <InputLabel
                        sx={{ textAlign: "right", paddingTop: "15px" }}
                      >
                        اولویت
                      </InputLabel>
                      <Select
                        variant="filled"
                        value={values.priority}
                        onChange={handleChange}
                        name="priority"
                        sx={{ width: "100%", direction: "rtl" }}
                      >
                        <MenuItem value="high" sx={{ direction: "rtl" }}>
                          خطرناک
                        </MenuItem>
                        <MenuItem value="medium" sx={{ direction: "rtl" }}>
                          متوسط
                        </MenuItem>
                        <MenuItem value="low" sx={{ direction: "rtl" }}>
                          کم اهمیت
                        </MenuItem>
                      </Select>
                    </Box>
                  </Box>
                </Box>

                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={setValue}
                  placeholder="شرح مساله"
                />

                <Box
                  display="flex"
                  justifyContent="flex-end"
                  mt="20px"
                  flexDirection="row-reverse"
                >
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    sx={{
                      fontSize: "h3",
                      fontWeight: "bold",
                      padding: "15px 20px",
                    }}
                  >
                    ایجاد تیکت جدید
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </div>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  subject: yup.string().required("required"),
  department: yup.string().required("required"),
  section: yup.string().required("required"),
  priority: yup.string().required("required"),
});
const initialValues = {
  subject: "",
  department: "",
  section: "",
  priority: "",
};

export default Ticket;
