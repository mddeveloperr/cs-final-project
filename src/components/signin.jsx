import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Container,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // API base URL
  const API_BASE_URL = "https://finalprojectserver-e3cfcpg0gbeharcj.northeurope-01.azurewebsites.net/v1/users";

  // Function to set admin token
  const setAdminToken = (adminToken, email, expiresInMs, value) => {
    const expiryTime = Date.now() + expiresInMs;
    localStorage.setItem("token", adminToken);
    localStorage.setItem("email", email);
    localStorage.setItem("adminTokenExpiry", expiryTime);
    localStorage.setItem("isCreator", value);
  };

  // Function to handle sign-in
  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      console.log("Sign in successful:", response.data);

      const isCreator = response?.data?.data?.role === "admin";
      setAdminToken(response?.data?.accessToken, email, 10000000000000, isCreator);

      // Redirect to the dashboard on successful login
      if (response?.data?.status === "success") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Sign in error:", error.response?.data?.message || error.message);
      setError("Sorry! Email or password incorrect.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#03024d", 
        color: "#ffff",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: "#02012b", // Darker background for the card
            color: "#C9D1D9", // Light text color for the form
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Sign In
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: { color: "#C9D1D9" }, // Light text color
            }}
            InputLabelProps={{
              style: { color: "#8B949E" }, // Muted label color
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#30363D" }, // Border color
                "&:hover fieldset": { borderColor: "#58A6FF" }, // Hover border color
                "&.Mui-focused fieldset": { borderColor: "#58A6FF" }, // Focused border color
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { color: "#C9D1D9" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end" style={{ color: "#8B949E" }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: { color: "#8B949E" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#30363D" },
                "&:hover fieldset": { borderColor: "#58A6FF" },
                "&.Mui-focused fieldset": { borderColor: "#58A6FF" },
              },
            }}
          />

          <FormControlLabel
            control={<Checkbox sx={{ color: "#8B949E" }} />}
            label={<Typography variant="body2" color="#8B949E">Remember me</Typography>}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontSize: 16,
              backgroundColor: "#58A6FF", // Blue button color
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "#1F6FEB" },
            }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>

          <Typography variant="body2" align="center" sx={{ color: "#8B949E", cursor: "pointer", textDecoration: "underline" }}>
            Forgot your password?
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default SignIn;
