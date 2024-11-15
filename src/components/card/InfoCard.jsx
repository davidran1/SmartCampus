// components/card/InfoCard.js
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const InfoCard = ({ title, value, bgColor }) => {
  return (
    <Card
      sx={{
        backgroundColor: bgColor,
        color: "white",
        p: 2,
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 6px 30px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
