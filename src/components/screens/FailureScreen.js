import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { SvgIcon } from '@mui/material';

const FailureScreen = ({ mainMessage, bodyMessage, onClose }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SvgIcon sx={{ width: '7rem', height: '7rem', color: '#e53e3e', marginBottom: '1rem' }}>
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" />
          </SvgIcon>
          <Typography variant="h6" fontWeight={600}>{mainMessage}</Typography>
          <Typography sx={{ marginTop: '0.5rem' }}>{bodyMessage}</Typography>
          <Button variant="contained" color="primary" onClick={onClose} sx={{ marginTop: '1rem' }}>
            OK
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FailureScreen;