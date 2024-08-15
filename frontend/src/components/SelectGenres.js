import { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';

function RecChoice({ genreList, setGenreRank, setDoneWithGenre, colors, recChoice }) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreClick = (genre) => {
    if (selectedGenres.includes(genre)) {
      // If genre is already selected, unselect it
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    } else {
      // Otherwise, select it
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <>
      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white', padding: '20px' }}>
        What are your favorite genres?
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {genreList.map((genre, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h7"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                bgcolor: selectedGenres.includes(genre) ? 'rgba(200, 100, 100, 0.5)' : 'transparent',
                margin: '10px',
                padding: '10px',
                borderRadius: '10px',
                border: '2px solid',
                borderColor: recChoice === '' 
                          ? colors.neutralColor 
                          : recChoice === 'Movie or TV Show' 
                          ? colors.movieColor 
                          : colors.musicColor,
                cursor: 'pointer',
              }}
              onClick={() => {
                handleGenreClick(genre);
                setGenreRank(genre);
              }}
            >
              {genre}
            </Typography>
          </Box>
        ))}
      </Box>
      <Button
        variant="text"
        sx={{
          fontWeight: 'bold',
          color: 'white',
          bgcolor: 'rgba(15, 15, 15, 1)',
          marginTop: '20px',
          padding: '10px',
          cursor: 'pointer',
        }}
        onClick={() => setDoneWithGenre(true)}
      >
        Done
      </Button>
    </>
  );
}

export default RecChoice;
