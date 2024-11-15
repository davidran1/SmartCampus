import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

const PAPER_STYLES = {
  p: 3,
  boxShadow: 4,
  borderRadius: 3,
  height: "400px",
  backgroundColor: "#f5f7fa",
  transition: "box-shadow 0.3s ease",
  "&:hover": { boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)" },
};

const ChartContainer = ({ title, children }) => (
  <Grid item xs={12} md={6}>
    <Paper sx={PAPER_STYLES}>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ fontWeight: "bold", color: "#3f51b5" }}
      >
        {title}
      </Typography>
      <Box sx={{ height: "100%" }}>
        {children}
      </Box>
    </Paper>
  </Grid>
);

export default ChartContainer;