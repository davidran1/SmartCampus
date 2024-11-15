import React from 'react';

const SuccessScreen = ({ mainMessage ,message }) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg style={{
            width: '4rem',
            height: '4rem',
            color: '#48bb78',
            marginBottom: '1rem'
          }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{mainMessage}</p>
          <p style={{ marginTop: '0.5rem' }}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;