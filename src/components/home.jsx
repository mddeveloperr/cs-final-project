import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Alert,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://finalprojectserver-e3cfcpg0gbeharcj.northeurope-01.azurewebsites.net/v1/videos/all2"
        );
        setVideos(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching videos.");
      }
    };

    fetchVideos();
  }, []);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#0D1117", minHeight: "100vh", color: "#F1F5F9" }}>
      <Paper elevation={6} sx={{ padding: 4, backgroundColor: "#1E293B", color: "#F1F5F9" }}>
        <Typography variant="h5" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Videos
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {videos.length > 0 ? (
          <Grid container spacing={4}>
            {videos.map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video._id}>
                <Card sx={{ backgroundColor: "#FFFFFF", color: "#000", borderRadius: "8px" }}>
                  <CardMedia
                    component="video"
                    src={video.filePath}
                    controls
                    height="200"
                    sx={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      Publisher: {video.publisher}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      Genre: {video.genre || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      Age Rating: {video.ageRating || "N/A"}
                    </Typography>
                    <Rating name="read-only" value={4} readOnly size="medium" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          !error && <Typography textAlign="center">No videos available.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
