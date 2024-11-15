import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  CategoryScale,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ChartTooltip,
  Legend
);

const RecycleDashboard = ({ goHome }) => {
  const token = useSelector((state) => state.userData.token); //storing the token of the user

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isMobile = window.innerWidth < 700;

  //if there is no token - that means no user is connected so he cannot view that page
  if (!token) {
    return <div>Error loading page! Please log in to view this page.</div>;
  }
  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            mb: 4,
            padding: "25px 1px",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #3f51b5, #21CBF3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          Recycle Dashboard
        </Typography>
      </Box>
      {/* Centered "SOON..." text */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh", // Adjust as needed
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "80px",
            fontWeight: "bold",
            color: "#888",
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          SOON...
        </Typography>
      </div>
          
    </Box>
  );
};

export default RecycleDashboard;
