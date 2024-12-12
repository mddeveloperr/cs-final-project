import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./components/home";
import UploadForm from "./components/uplaod";
import SignIn from "./components/signin";
import { CssBaseline, Box } from "@mui/material";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar onNavClick={setCurrentPage} currentPage={currentPage} />
              <Box sx={{ minHeight: "100vh", backgroundColor: "#0D1117" }}>
                {currentPage === "dashboard" && <Dashboard />}
                {currentPage === "upload" && <UploadForm />}
              </Box>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
