import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading({rec, color}) {
  return (
    <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff', // White text for contrast
      }}>
      
      {/* Movie Reel Loading Spinner */}
      <CircularProgress
        size={80}
        thickness={4}
        sx={{
          color: color,
          marginBottom: 2,
        }}
      />
      
      {/* Movie-Themed Loading Text */}
      <Typography variant="h6" sx={{ letterSpacing: 2 }}>
        Loading Your {rec} Recommendations...
      </Typography>
    </Box>
  );
}
