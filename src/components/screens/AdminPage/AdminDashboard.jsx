import React, { useEffect, useState } from "react";
import { Typography, Container, Grid, Box } from "@mui/material";
import { Bar, Line, Pie, Radar, Doughnut } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import InfoCard from "../../card/InfoCard";
import Sidebar from "./Sidebar";
import ChartContainer from "./ChartContainer";
import { useGetNumberOfUsersQuery } from "../../../redux/rtk/userData";
import { useSelector } from "react-redux";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const AdminDashboard = () => {
  const token = useSelector((state) => state.userData.token);
  const { data = {}, error, isLoading } = useGetNumberOfUsersQuery(token);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    if (data.totalUsers !== undefined) {
      setTotalUsers(data.totalUsers);
    }
  }, [data]);

  const chartData = {
    bar: {
      labels: ["Students", "Lecturers", "Admins"],
      datasets: [
        {
          label: "Number of Users",
          data: [45, 15, 5], // Not real data , need to change in the future
          backgroundColor: Object.values(CHART_COLORS),
          borderRadius: 10,
        },
      ],
    },
    line: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "User Activity (Monthly)",
          data: [20, 30, 60, 45],
          borderColor: CHART_COLORS.primary,
          backgroundColor: "rgba(63, 81, 181, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    pie: {
      labels: ["Students", "Lecturers", "Admins"],
      datasets: [
        {
          label: "User Roles Distribution",
          data: [45, 15, 5], // Not real data , need to change in the future
          backgroundColor: Object.values(CHART_COLORS),
        },
      ],
    },
    radar: {
      labels: ["Login", "Signups", "Profile Updates", "Posts", "Comments"],
      datasets: [
        {
          label: "Feature Usage",
          data: [85, 65, 70, 90, 50], // Not real data , need to change in the future
          backgroundColor: "rgba(63, 81, 181, 0.2)",
          borderColor: CHART_COLORS.primary,
          pointBackgroundColor: CHART_COLORS.primary,
          fill: true,
        },
      ],
    },
    doughnut: {
      labels: ["Completed", "In Progress", "Not Started"],
      datasets: [
        {
          label: "Tasks Completion",
          data: [40, 30, 30], // Not real data , need to change in the future
          backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        },
      ],
    },
  };

  const infoCards = [
    {
      title: "Total Users",
      value: isLoading ? "" : totalUsers,
      bgColor: "#3f51b5",
    },
    { title: "Active Users", value: "56", bgColor: "#ff4081" },
    { title: "New Signups", value: "15", bgColor: "#4caf50" },
    { title: "Logins Today", value: "34", bgColor: "#ff9800" },
    { title: "Banned Users", value: "2", bgColor: "#e91e63" },
    { title: "Daily Visits", value: "124", bgColor: "#673ab7" },
  ];

  if (error) {
    return (
      <div>
        Error loading page! either you are not admin or there's an error{" "}
        {error.message}
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Container
        sx={{
          mt: "60px",
          ml: "150px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: "bold",
            background: `linear-gradient(90deg, #3f51b5, #21CBF3)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          Admin Dashboard
        </Typography>
        <Grid container spacing={4} sx={{ width: "100%", mb: 4 }}>
          {infoCards.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <InfoCard {...card} />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={4} sx={{ width: "100%" }}>
          <ChartContainer title="Users Overview">
            <Bar data={chartData.bar} options={CHART_OPTIONS} />
          </ChartContainer>

          <ChartContainer title="User Activity (Last Month)">
            <Line data={chartData.line} options={CHART_OPTIONS} />
          </ChartContainer>

          <ChartContainer title="User Roles Distribution">
            <Pie data={chartData.pie} options={CHART_OPTIONS} />
          </ChartContainer>

          <ChartContainer title="Feature Usage by Users">
            <Radar data={chartData.radar} options={CHART_OPTIONS} />
          </ChartContainer>

          <ChartContainer title="Tasks Completion">
            <Doughnut data={chartData.doughnut} options={CHART_OPTIONS} />
          </ChartContainer>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            More data and insights coming soon!
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: "rgba(0, 0, 0, 0.1)" },
    },
    x: {
      grid: { display: false },
    },
  },
};

const CHART_COLORS = {
  primary: "#3f51b5",
  secondary: "#ff4081",
  success: "#4caf50",
  warning: "#ff9800",
  error: "#f44336",
};

export default AdminDashboard;
