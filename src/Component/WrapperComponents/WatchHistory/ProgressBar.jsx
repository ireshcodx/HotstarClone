import React, { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Generate a random value between 0 and 100
    const randomValue = Math.floor(Math.random() * 101);
    setProgress(randomValue);
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ 
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#1f4bac', 
          },
        }} 
      />
    </Box>
  );
}