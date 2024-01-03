import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Grid,
} from "@mui/material";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Enter Phone and National ID, 2: Enter Confirmation Code, 3: Set New Password
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSendConfirmationCode = () => {
    // Add logic to send confirmation code to the user's phone
    // Assume successful code sending and move to the next step
    setStep(2);
  };

  const handleVerifyConfirmationCode = () => {
    // Add logic to verify the entered confirmation code
    // Assume successful verification and move to the next step
    setStep(3);
  };

  const handleChangePassword = () => {
    // Add logic to change the user's password
    // Assume successful password change and navigate to login page
    console.log("Password changed successfully!");
    // Add code to navigate to the login page
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={8}>
        <Typography component="h1" variant="h5">
          بازیابی رمز عبور
        </Typography>
        <form>
          {step === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="تلفن"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="nationalId"
                  label="کد ملی"
                  name="nationalId"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSendConfirmationCode}
                >
                  ارسال کد تایید
                </Button>
              </Grid>
            </Grid>
          )}

          {step === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="confirmationCode"
                  label="کد تایید"
                  name="confirmationCode"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleVerifyConfirmationCode}
                >
                  تایید کد
                </Button>
              </Grid>
            </Grid>
          )}

          {step === 3 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="newPassword"
                  label="رمز عبور جدید"
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmNewPassword"
                  label="تأیید رمز عبور جدید"
                  type="password"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleChangePassword}
                >
                  تغییر رمز عبور
                </Button>
              </Grid>
            </Grid>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
