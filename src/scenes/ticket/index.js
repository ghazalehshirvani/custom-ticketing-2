import {
  Box,
  Button,
  TextField,
  Typography,
  colors,
  useTheme,
} from "@mui/material";
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
import {
  departmentListURL,
  sectionListURL,
  ticketURL,
  userProfileURL,
} from "../api/axios";

const Ticket = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [value, setValue] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [departmentList, setDepartmentList] = useState([]);
  const [sectionList, setSectionList] = useState([]);

  useEffect(() => {
    try {
      const response = fetch(departmentListURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      response.then((res) => {
        console.log(res);
        if (res.ok) {
          const result = res.json();
          result.then((data) => {
            setDepartmentList(data);
          });
        } else {
          console.error("department fetching failed");
        }
      });
    } catch (error) {
      console.error("Error during department fetching:", error);
    }
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      try {
        const response = fetch(sectionListURL + selectedDepartment, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        });

        response.then((res) => {
          if (res.ok) {
            const result = res.json();
            result.then((data) => {
              console.log(data);
              setSectionList(data);
            });
          } else {
            console.error("section fetching failed");
          }
        });
      } catch (error) {
        console.error("Error during section fetching:", error);
      }
    }
  }, [selectedDepartment]);

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch(ticketURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          subject: values["subject"],
          dep_id: selectedDepartment,
          section_id: values["section"],
          priority: values["priority"],
          description: value,
          attachment: null,
          user_ip: null,
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
  const [profile, setProfile] = useState({});

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
    const fetchData = async () => {
      try {
        const response = await fetch(userProfileURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch User Profile: ${
              response.statusText
            } ${localStorage.getItem("accessToken")}`
          );
        }
        const data = await response.json();
        setProfile(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [localStorage]);

  return (
    <div className="pageContainer">
      <CustomSidebar isSidebar={isSidebar} texAlign="right" />
      <div className="dataContainer">
        <Topbar setIsSidebar={setIsSidebar} />

        <Box m="20px" direction="rtl">
          <Header title="اطلاعات تیکت " />

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
                  <Box >
                  <Box sx={{ flex: 1, flexDirection: "row"}}>
                    <Typography>نام </Typography>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      disabled
                      value={profile.name}
                      name="name"
                      sx={{ gridColumn: "span 2", direction: "rtl" }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gridColumn: "span 3",
                      gap: "35px",
                      width: "430%",
                      paddingBottom: "15px",
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
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        name="department"
                        sx={{ width: "100%", direction: "rtl" }}
                      >
                        {departmentList.map((department, i) => (
                          <MenuItem
                            key={i}
                            value={department.id}
                            sx={{ direction: "rtl" }}
                          >
                            {department.DepName}
                          </MenuItem>
                        ))}
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
                        {sectionList.map((section, i) => (
                          <MenuItem
                            key={i}
                            value={section.id}
                            sx={{ direction: "rtl" }}
                          >
                            {section.SectionName}
                          </MenuItem>
                        ))}
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
                </Box>
                <Box>
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
                    sx={{ gridColumn: "span 2", direction: "rtl" , paddingBottom: "10px",}}
                  />
                  <ReactQuill
                    theme="snow"
                    onChange={setValue}
                    value={value}
                    placeholder="شرح مساله"
                  />
                </Box>

                <Box mt="20px" display="flex">
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
                    انتخاب فایل
                  </Button>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
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
  section: yup.string().required("required"),
  priority: yup.string().required("required"),
});
const initialValues = {
  subject: "",
  section: "",
  priority: "",
};

export default Ticket;
