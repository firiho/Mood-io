import { useState } from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import MoodSelection from './components/MoodSelection';
import { Box, CssBaseline } from '@mui/material';
import RecChoice from './components/RecChoice';
import ProgressBar from './components/ProgressBar';
import SelectGenres from './components/SelectGenres';
import LoadMovies from './components/LoadMovies';
import LoadMusic from './components/LoadMusic';

function App() {

  // set window title
  document.title = 'Mood.io';

  const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#000000',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });

  // variables
  const moods = ['Happy', 'Sad', 'Nostalgic', 'Energetic', 'Motivated', 'Hopeful', 'Loving', 'Depressed', 'Peaceful'];
  const musicGenres = ['Afrobeats', 'Alternative', 'Blues', 'Classical', 'Country', 'Dance', 'Electronic', 'Hip-Hop', 'Jazz', 'Pop', 'R&B', 'Rap', 'Reggae', 'Rock', 'Soul', 'Techno', 'Metal'];
  const movieGenres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'News', 'Reality', 'Romance', 'Science Fiction', 'Talk Show', 'Thriller', 'War', 'Western'];
  const choices = ['Movie or TV Show', 'Music'];

  const colors = { movieColor: 'rgba(255, 0, 0, 0.5)', musicColor: 'rgba(0, 255, 0, 0.5)', neutralColor: '#ffffff'}

  // states
  const [mood, setMood] = useState('');
  const [genreList, setGenreList] = useState([]);
  const [recChoice, setRecChoice] = useState('');
  const [doneWithGenre, setDoneWithGenre] = useState(false);
  const [genreRank, setGenreRank] = useState({});
  const [wrapperColor, setWrapperColor] = useState(colors.neutralColor);

  const handlesetRecChoice = (choice) => {
    setRecChoice(choice);
    if (choice === 'Movie or TV Show') {
      setGenreList(movieGenres);
      setWrapperColor(colors.movieColor);
    }
    else if (choice === 'Music') {
      setGenreList(musicGenres);
      setWrapperColor(colors.musicColor);
    }
  };

  const handleSetGenreRank = (genre) => {
    if (genreRank[genre] === 1) {
      delete genreRank[genre];
    }
    else if (genreRank[genre] === 0 || genreRank[genre] === undefined) {
      setGenreRank({[genre]: 1, ...genreRank});
    }
    console.log(genreRank);
    return;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
      <Header 
      setDoneWithGenre={setDoneWithGenre} 
      setGenreList={setGenreList} 
      setGenreRank={setGenreRank} 
      setMood={setMood} 
      setRecChoice={handlesetRecChoice}
      movieGenres={movieGenres}
      musicGenres={musicGenres}
      setWrapperColor={setWrapperColor}
      neutralColor={colors.neutralColor}
      />
      {/* <ProgressBar /> not today's problem */}
      <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '85%',
        height: '100%',
        bgcolor: 'rgba(15, 15, 15, 1)',
        borderRadius: '10px',
        padding: '10px',
        border: '2px solid',
        marginTop: '10px',
        borderColor: wrapperColor,
      }}
    >
      {/* Mood Selection */}
      {(mood === '') && (recChoice === '') &&
      <MoodSelection moods={moods} setMood={setMood} colors={colors} recChoice={recChoice}/>
      }

      {/* Mood Selection */}
      {(mood === '') && (recChoice !== '') &&
      <MoodSelection moods={moods} setMood={setMood} colors={colors} recChoice={recChoice}/>
      }

      {/* Choice Selection */}
      {(mood !== '') && (recChoice === '') &&
        <RecChoice choices={choices} setRecChoice={handlesetRecChoice} colors={colors}/>
      }

      {/* Choose Genres */}
      {(mood !== '') && (recChoice !== '') && (!doneWithGenre) &&
        <SelectGenres genreList={genreList} setGenreRank={handleSetGenreRank} setDoneWithGenre={setDoneWithGenre} colors={colors} recChoice={recChoice}/>
        }
      
      
      {/* Choose what you have watched/listened to */}

      {(doneWithGenre) && recChoice === 'Movie or TV Show' &&
      <LoadMovies genreRank={genreRank} mood={mood}/>
      }

      {(doneWithGenre) && recChoice === 'Music' &&
      <LoadMusic genreRank={genreRank} mood={mood}/>
      }
    </Box>
    </Box>
    </ThemeProvider>
  );
}

export default App;