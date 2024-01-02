import React, { useState, useEffect } from "react";
import { userProfileURL } from "../api/axios";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  InputLabel,
  Box,
  Grid,
  Button,
} from "@mui/material";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    jobPosition: "",
    picProfile: null,
  });

  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  // You can extract the `url` and `path` from the pathname
  const url = pathname;

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
            `Failed to fetch User Profile: ${response.statusText}`
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

  const handleChangePassword = () => {
    // Redirect to the Change Password page
    navigate('/change-password');
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        {profile.pic_profile && (
          <Box display="flex" justifyContent="center">
            <img
              src={profile.picـprofile}
              alt="Profile"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Box>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" textAlign="center">
          اطلاعات کاربری
        </Typography>
      </Grid>
      <Grid item xs={12} marginRight={"10vh"}>
        <InputLabel htmlFor="name">نام:</InputLabel>
        <TextField
          sx={{ width: "40%" }}
          variant="filled"
          id="jobPosition"
          type="text"
          value={profile.name}
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12} marginRight={"10vh"}>
        <InputLabel htmlFor="jobPosition">موقعیت شغلی:</InputLabel>
        <TextField
          sx={{ width: "40%" }}
          variant="filled"
          id="jobPosition"
          type="text"
          value={profile.job_position}
          InputProps={{ readOnly: true }}
        />
      </Grid>
    
      <Grid item xs={12} marginRight={"10vh"}>
        <Box textAlign="Right">
          <Button variant="outlined" onClick={handleChangePassword} sx={{ width: "40%" }}>
            تغییر رمز عبور
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
