import { useEffect } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from './components/Header';
import { Typography } from '@mui/material';

function App() {

  const theme = createTheme({
  });

  const moods = ['Happy', 'Sad', 'Nostalgic', 'Energetic', 'Motivated', 'Hopeful', 'Loving', 'Depressed', 'Peaceful'];

  useEffect(() => {
    fetch('/api/hello', {}) 
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data:', data);
      })
      .catch(error => {
        console.error('Error while fetching:', error);
      });
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Header />
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',

          // width: 128,
          // height: 128,
        },
        width: '85%',
        height: '100%',
        bgcolor: 'rgba(15, 15, 15, 1)',
        borderRadius: '10px',
        padding: '10px',
        border: '2px solid',
        //borderColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'rgba(0, 255, 0, 0.5)',
      }}
    >
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
        Hello there, what's your mood today?
      </Typography>
      
    </Box>
    </div>
    </ThemeProvider>
  );
}

export default App;