import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = ({ onNavClick, currentPage }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1E293B", color: "#F1F5F9" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "#60A5FA" }}>
          WEB APP
        </Typography>

        <Box>
          <Button
            color="inherit"
            onClick={() => onNavClick("dashboard")}
            sx={{
              color: currentPage === "dashboard" ? "#60A5FA" : "#F1F5F9",
              borderBottom: currentPage === "dashboard" ? "2px solid #60A5FA" : "none",
            }}
          >
            Home
          </Button>

          <Button
            color="inherit"
            onClick={() => onNavClick("upload")}
            sx={{
              color: currentPage === "upload" ? "#60A5FA" : "#F1F5F9",
              borderBottom: currentPage === "upload" ? "2px solid #60A5FA" : "none",
              ml: 2,
            }}
          >
            Upload
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
