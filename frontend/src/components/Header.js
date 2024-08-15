import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = ({setMood, setGenreList, setRecChoice, setDoneWithGenre, setGenreRank, movieGenres, musicGenres, setWrapperColor, neutralColor}) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black', padding: '0 16px' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button sx={{ color: '#fff', textTransform: 'none' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }} 
        onClick={() => {
          setRecChoice('');
          setGenreList([]);
          setMood('');
          setGenreRank({});
          setDoneWithGenre(false);
          setWrapperColor(neutralColor);
        }}
        >
            mood.io
        </Typography>
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button sx={{ color: '#fff', textTransform: 'none' }}>
          <Typography variant="h7" component="div" sx={{ fontWeight: 'bold' }}
          onClick={() => {
            setRecChoice('Movie or TV Show');
            setGenreList(movieGenres);
            setGenreRank({});
            setDoneWithGenre(false);
          }}
          >
            Movies
        </Typography>
          </Button>
            
          <Button sx={{ color: '#fff', textTransform: 'none' }}>
          <Typography variant="h7" component="div" sx={{ fontWeight: 'bold' }}
          onClick={() => {
            setRecChoice('Music');
            setGenreList(musicGenres);
            setGenreRank({});
            setDoneWithGenre(false);
          }}
          >
            Music
        </Typography>
          </Button>
        </Box>

        <Button sx={{ color: '#fff', textTransform: 'none' }}
        onClick={() => {
          setRecChoice('');
          setGenreList([]);
          setMood('');
          setGenreRank({});
          setDoneWithGenre(false);
          setWrapperColor(neutralColor);
        }}
        >Restart</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
