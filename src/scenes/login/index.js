import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useTheme } from '@mui/material';

// import { login } from './api/AuthProvider'; // Import the useAuth hook
import {loginURL } from '../api/axios';
import { tokens } from "../../theme";




const  Login = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

   const [authToken, setAuthToken] = useState('');
  

  // const { login } = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data;

     try {
      data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });

      // Replace this with your actual API endpoint for login
      const response = await fetch( loginURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.get('email'),
          password: data.get('password'),
        }),
      });
 
      if(response.ok){
        // Call the login function from AuthContext
        // login(token);
        // Handle successful login, redirect, etc.
        const result = await response.json();
        const accessToken = result.token;
        setAuthToken(accessToken);
        console.log('Token:', accessToken)
      } else {
        console.error('Login failed');
      }  
 
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ورود
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="نام کاربری"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{direction: "rtl"}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="رمز عبور"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{direction: "rtl"}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="من را بخاطر بسپار"
              sx={{ flexDirection: 'row-reverse', textAlign: 'right', }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ثبت نام
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" textAlign={'right'}>
                  رمز عبور خود را فراموش کرده ام.
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"ثبت نام"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
