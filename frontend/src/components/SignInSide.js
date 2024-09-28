

import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import sidepage from "../assets/sidepage.png";
import { loginUser } from "../api/Api";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import { toast } from "react-toastify";

const defaultTheme = createTheme();

export default function SignInSide() {
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate('/dashboard');
  //   }
  // }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const loginData = {
      username: data.get("username"),
      password: data.get("password"),
    };

    try {
      const response = await loginUser(loginData.username, loginData.password);
      if (response && response.token) { // Ensure response has token
        localStorage.setItem("token", response.token); // Store token in localStorage
        toast.success("Login Successful");
        login({ token: response.token }); // Update Auth context state
        navigate('/dashboard'); // Navigate to dashboard
      } else {
        throw new Error("No token returned");
      }
    } catch (error) {
      toast.error("Invalid credentials");
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={3}
          md={5}
          sx={{
            backgroundImage: `url(${sidepage})`,
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={9}
          md={7}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errorMessage && <Typography color="error">{errorMessage}</Typography>}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, mb: 2, width: "100%" }}>
                <Button type="submit" variant="contained" sx={{ flexGrow: 1, mr: 1 }}>
                  Sign In
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
