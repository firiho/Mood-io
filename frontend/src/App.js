import { useEffect, useState } from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import MoodSelection from './components/MoodSelection';
import { Box } from '@mui/material';

import RecChoice from './components/RecChoice';
import ProgressBar from './components/ProgressBar';
import SelectGenres from './components/SelectGenres';

function App() {

  // set window title
  document.title = 'Mood.io';

  const theme = createTheme({
  });

  // variables
  const moods = ['Happy', 'Sad', 'Nostalgic', 'Energetic', 'Motivated', 'Hopeful', 'Loving', 'Depressed', 'Peaceful'];
  const movieGenres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller'];
  const musicGenres = ['Afrobeats', 'Alternative', 'Blues', 'Classical', 'Country', 'Dance', 'Electronic', 'Hip-Hop', 'Jazz', 'Pop', 'R&B', 'Rap', 'Reggae', 'Rock', 'Soul', 'Techno', 'Metal'];
  const choices = ['Movie', 'TV Show', 'Music'];

  const movieColor = '#ff0000';
  const showColor = '#00ff00';
  const musicColor = '#0000ff';
  const neutralColor = '#ffffff';

  // states
  const [mood, setMood] = useState('');
  const [genreList, setGenreList] = useState([]);
  const [recChoice, setRecChoice] = useState('');
  const [doneWithGenre, setDoneWithGenre] = useState(false);
  const [genreRank, setGenreRank] = useState({});

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

  const handlesetRecChoice = (choice) => {
    setRecChoice(choice);
    if (choice === 'Movie') {
      setGenreList(movieGenres);
    }
    else if (choice === 'TV Show') {
      setGenreList(movieGenres);
    }
    else if (choice === 'Music') {
      setGenreList(musicGenres);
    }
  };

  const handleSetGenreRank = (genre) => {
    if (genreRank[genre] === undefined) {
      setGenreRank({...genreRank, [genre]: 1});
    }
    else {
      setGenreRank({...genreRank, [genre]: genreRank[genre] + 1});
    }
    console.log(genreRank);
  };

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Header />
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
        borderColor: 'rgba(255, 0, 0, 0.5)',
        //borderColor: 'rgba(0, 255, 0, 0.5)',
      }}
    >
      {/* Mood Selection */}
      {(mood === '') && (recChoice === '') &&
      <MoodSelection moods={moods} setMood={setMood}/>
      }

      {/* Choice Selection */}
      {(mood !== '') && (recChoice === '') &&
        <RecChoice choices={choices} setRecChoice={handlesetRecChoice}/>
      }

      {/* Choose Genres */}
      {(mood !== '') && (recChoice !== '') &&
        <SelectGenres genreList={genreList} setGenreRank={handleSetGenreRank} setDoneWithGenre={setDoneWithGenre}/>
        }
      
      {/* Choose what you have watched */}
    </Box>
    </div>
    </ThemeProvider>
  );
}

export default App;