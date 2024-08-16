import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = ({setMood, recChoice, setGenreList, setRecChoice, setDoneWithGenre, setGenreRank, movieGenres, musicGenres, setWrapperColor, colors}) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgba(0,0,0,1)', padding: '0 16px' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button sx={{ color: '#fff', textTransform: 'none' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }} 
        onClick={() => {
          setRecChoice('');
          setGenreList([]);
          setMood('');
          setGenreRank({});
          setDoneWithGenre(false);
          setWrapperColor(colors.neutralColor);
        }}
        >
            mood.io
        </Typography>
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button sx={{ color: recChoice === 'Movie or TV Show' ? colors.movieColor : colors.neutralColor, textTransform: 'none' }}>
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
            
          <Button sx={{ color: recChoice === 'Music' ? colors.musicColor : colors.neutralColor, textTransform: 'none' }}>
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
          setWrapperColor(colors.neutralColor);
        }}
        >Restart</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
