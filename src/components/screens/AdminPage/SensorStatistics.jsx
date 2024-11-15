// screens/AdminPage/SensorStatistics.js
import React from 'react';
import { Typography, Container, Box, Grid, Paper } from '@mui/material';
import Sidebar from './Sidebar';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import InfoCard from '../../card/InfoCard';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const SensorStatistics = () => {

  
  const roomData = {
    totalRooms: 50, 
    occupiedRooms: 30, 
    freeRooms: 20, 
    roomsWithLightsOn: 25, 
    roomsWithPeople: 30, 
  };

  const barData = {
    labels: ['Occupied Rooms', 'Free Rooms', 'Lights On', 'People Present'],
    datasets: [
      {
        label: 'Room Statistics',
        data: [roomData.occupiedRooms, roomData.freeRooms, roomData.roomsWithLightsOn, roomData.roomsWithPeople],
        backgroundColor: ['#ff4081', '#3f51b5', '#ffeb3b', '#4caf50'],
        borderRadius: 10,
      },
    ],
  };

  const pieData = {
    labels: ['Occupied Rooms', 'Free Rooms'],
    datasets: [
      {
        label: 'Room Occupancy Distribution',
        data: [roomData.occupiedRooms, roomData.freeRooms],
        backgroundColor: ['#ff4081', '#3f51b5'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar component */}
      <Sidebar />

      {/* Main content container */}
      <Container sx={{ mt: "60px", ml: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #3f51b5, #21CBF3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'fadeIn 2s ease-in-out',
          }}
        >
          Sensor Statistics
        </Typography>

        {}
        <Grid container spacing={4} sx={{ width: '100%', mb: 4 }}>
          <Grid item xs={12} md={4}>
            <InfoCard title="Total Rooms" value={roomData.totalRooms} bgColor="#3f51b5" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoCard title="Occupied Rooms" value={roomData.occupiedRooms} bgColor="#ff4081" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoCard title="Free Rooms" value={roomData.freeRooms} bgColor="#4caf50" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoCard title="Rooms with Lights On" value={roomData.roomsWithLightsOn} bgColor="#ffeb3b" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoCard title="Rooms with People" value={roomData.roomsWithPeople} bgColor="#4caf50" />
          </Grid>
        </Grid>

        {}
        <Grid container spacing={4} sx={{ width: '100%' }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, boxShadow: 4, borderRadius: 3, height: '400px', backgroundColor: '#f5f7fa', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)' } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                Room Overview
              </Typography>
              <Box sx={{ height: '100%' }}>
                <Bar data={barData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, boxShadow: 4, borderRadius: 3, height: '400px', backgroundColor: '#f5f7fa', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)' } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                Room Occupancy Distribution
              </Typography>
              <Box sx={{ height: '100%' }}>
                <Pie data={pieData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SensorStatistics;
