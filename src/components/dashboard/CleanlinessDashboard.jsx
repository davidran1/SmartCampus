import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const CleanlinessDashboard = ({ goHome }) => {
  const token = useSelector((state) => state.userData.token); // storing the token of the user

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If there is no token - that means no user is connected, so they cannot view the page
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
          Cleanliness Dashboard
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

export default CleanlinessDashboard;
