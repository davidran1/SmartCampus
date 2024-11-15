// screens/AdminPage/AdminAlertCenter.js
import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Grid, Paper, List, ListItem } from '@mui/material';
import Sidebar from './Sidebar'; 
import { Alert, AlertTitle } from '@mui/material';
import { WarningAmber, Error, Info } from '@mui/icons-material';


const AdminAlertCenter = () => {
  const [alerts, setAlerts] = useState([]);


  useEffect(() => {
    const mockAlerts = [
      { id: 2, type: 'warning', message: 'Lights in building 2, room 203 were turned on at 3 AM, unusual for this time.', date: '2024-09-25' },
      { id: 3, type: 'info', message: 'Light sensor in building 5, room 305 reports lights are on for 10 hours.', date: '2024-09-24' },
      { id: 4, type: 'error', message: 'Light sensor does not work.', date: '2024-09-23' },
      { id: 5, type: 'error', message: 'Motion sensor does not work.', date: '2024-09-23' },
      { id: 6, type: 'info', message: 'Temperature sensor in building 2, room 202 reports 16°C.', date: '2024-09-25' , date: '2024-09-22' },
      { id: 7, type: 'warning', message: 'Movement detected in building 5, room 306 at 2 AM, unusual for this time.', date: '2024-09-21' },
    ];
    setAlerts(mockAlerts);
  }, []);

  
  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return <Error />;
      case 'warning':
        return <WarningAmber />;
      case 'info':
        return <Info />;
      default:
        return null;
    }
  };
  
  
  const getAlertTitle = (type) => {
    switch (type) {
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Information';
      default:
        return '';
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      
      <Sidebar />

      
      <Container sx={{ mt: 4, ml: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          Admin Alert Center
        </Typography>

       
        <Grid container spacing={4} sx={{ width: '100%', mb: 4 }}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                boxShadow: 4,
                borderRadius: 3,
                backgroundColor: '#f5f7fa',
                transition: 'box-shadow 0.3s ease',
                '&:hover': { boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)' },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                System Alerts
              </Typography>

              {/* Alert list */}
              {alerts.length === 0 ? (
                <Typography variant="body1" color="textSecondary">
                  No alerts to display at the moment.
                </Typography>
              ) : (
                <List>
                  {alerts.map((alert) => (
                    <ListItem key={alert.id} sx={{ mb: 2 }}>
                      <Alert severity={alert.type} icon={getAlertIcon(alert.type)} sx={{ width: '100%' }}>
                        <AlertTitle>{getAlertTitle(alert.type)}</AlertTitle>
                        {alert.message} — <strong>{alert.date}</strong>
                      </Alert>
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminAlertCenter;
