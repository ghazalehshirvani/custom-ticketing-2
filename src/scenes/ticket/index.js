import { Box, Button, TextField, colors, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import { Select, MenuItem, FormControl, InputLabel, Grid } from "@mui/material";
import { tokens } from "../../theme";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react';
import './ticket.css';


const Ticket = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  
  const [value, setValue] = useState('');
  return (
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2", direction: "rtl" }}
              />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridColumn: "span 6",
                  gap: "10px",
                  width: "100%",
                  paddingBottom: "10px"
                }}
              >
                <Box>
                  <InputLabel sx={{ textAlign: "right", paddingTop: "15px" }}>
                    دپارتمان
                  </InputLabel>
                  <Select
                    variant="filled"
                    value={values.status}
                    onChange={handleChange}
                    name="status"
                    sx={{ width: "100%", direction: "rtl" }}
                  >
                    <MenuItem value="IT" sx={{ direction: "rtl" }}>
                      آی تی
                    </MenuItem>
                    <MenuItem value="Manager" sx={{ direction: "rtl" }}>
                      مالی
                    </MenuItem>
                  </Select>
                </Box>
                <Box>
                  <InputLabel sx={{ textAlign: "right", paddingTop: "15px" }}>
                    بخش
                  </InputLabel>
                  <Select
                    variant="filled"
                    value={values.status}
                    onChange={handleChange}
                    name="status"
                    sx={{ width: "100%", direction: "rtl" }}
                  >
                    <MenuItem value="IT" sx={{ direction: "rtl" }}>
                      آی تی - نرم افزار
                    </MenuItem>
                    <MenuItem value="IT" sx={{ direction: "rtl" }}>
                      آی تی - امنیت
                    </MenuItem>
                    <MenuItem value="IT" sx={{ direction: "rtl" }}>
                      آی تی - سخت افزار
                    </MenuItem>
                  </Select>
                </Box>

                <Box >
                  <InputLabel sx={{ textAlign: "right", paddingTop: "15px" }}>اولویت</InputLabel>
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
            
            
            <ReactQuill theme="snow" value={value} onChange={setValue} placeholder="شرح مساله"  />
            
            <Box
              display="flex"
              justifyContent="flex-end"
              mt="20px"
              flexDirection="row-reverse"
            >
              
              <Button type="submit" color="secondary" variant="contained" sx={{ fontSize: "h3",fontWeight:"bold", padding: "15px 20px" }}>
                ایجاد تیکت جدید
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Ticket;
