import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Alert, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import axios from "axios";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [producer, setProducer] = useState("");
  const [genre, setGenre] = useState("");
  const [ageRating, setAgeRating] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle file change and set preview
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    if (uploadedFile) {
      const fileURL = URL.createObjectURL(uploadedFile);
      setPreview(fileURL);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      setSuccess("");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("publisher", publisher);
    formData.append("producer", producer);
    formData.append("genre", genre);
    formData.append("ageRating", ageRating);
    formData.append("video", file);

    try {
      await axios.post(
        "https://finalprojectserver-e3cfcpg0gbeharcj.northeurope-01.azurewebsites.net/v1/videos/upload2",
        formData
      );
      setError("");
      setSuccess("Upload successful!");
      setTitle("");
      setPublisher("");
      setProducer("");
      setGenre("");
      setAgeRating("");
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while uploading the video.");
      setSuccess("");
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#0D1117", minHeight: "100vh", color: "#F1F5F9" }}>
      <Paper elevation={6} sx={{ padding: 4, backgroundColor: "#1E293B", color: "#F1F5F9" }}>
        <Typography variant="h5" gutterBottom>
          Upload Video
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{ style: { color: "#F1F5F9" } }}
            InputLabelProps={{ style: { color: "#8B949E" } }}
          />

          <TextField
            fullWidth
            label="Publisher"
            variant="outlined"
            margin="normal"
            required
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            InputProps={{ style: { color: "#F1F5F9" } }}
            InputLabelProps={{ style: { color: "#8B949E" } }}
          />

          <TextField
            fullWidth
            label="Producer"
            variant="outlined"
            margin="normal"
            required
            value={producer}
            onChange={(e) => setProducer(e.target.value)}
            InputProps={{ style: { color: "#F1F5F9" } }}
            InputLabelProps={{ style: { color: "#8B949E" } }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: "#8B949E" }}>Genre</InputLabel>
            <Select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              sx={{ color: "#F1F5F9", "& .MuiOutlinedInput-notchedOutline": { borderColor: "#8B949E" } }}
            >
              <MenuItem value="Action">Action</MenuItem>
              <MenuItem value="Drama">Drama</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Horror">Horror</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: "#8B949E" }}>Age Rating</InputLabel>
            <Select
              value={ageRating}
              onChange={(e) => setAgeRating(e.target.value)}
              required
              sx={{ color: "#F1F5F9", "& .MuiOutlinedInput-notchedOutline": { borderColor: "#8B949E" } }}
            >
              <MenuItem value="PG">PG</MenuItem>
              <MenuItem value="13+">13+</MenuItem>
              <MenuItem value="18+">18+</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" component="label" sx={{ mt: 2, backgroundColor: "#60A5FA" }}>
            Upload File
            <input type="file" hidden onChange={handleFileChange} accept="image/*, video/*" />
          </Button>

          {preview && (
            <Box mt={2}>
              {file.type.startsWith("image/") ? (
                <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px" }} />
              ) : (
                <video src={preview} controls style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px" }} />
              )}
            </Box>
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, backgroundColor: "#60A5FA" }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default UploadForm;
