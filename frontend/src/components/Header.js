import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black', padding: '0 16px' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button sx={{ color: '#fff', textTransform: 'none' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            mood.io
        </Typography>
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button sx={{ color: '#fff', textTransform: 'none' }}>
          <Typography variant="h7" component="div" sx={{ fontWeight: 'bold' }}>
            Movies
        </Typography>
          </Button>
            
          <Button sx={{ color: '#fff', textTransform: 'none' }}>
          <Typography variant="h7" component="div" sx={{ fontWeight: 'bold' }}>
            Music
        </Typography>
          </Button>
        </Box>

        <Button sx={{ color: '#fff', textTransform: 'none' }}>Restart</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
