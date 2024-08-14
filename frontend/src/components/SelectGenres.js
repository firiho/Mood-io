import { Typography, Box, Button} from '@mui/material';

function RecChoice({genreList, setGenreRank, setDoneWithGenre}) {
  return (
    <>
      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white', padding: '20px'}}>
        What are your favorite genres?
      </Typography>

      <Box sx={{ display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center', 
        }}>
        {genreList.map((genre, index) => (
          <Box key={index} 
          sx={{ display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            alignItems: 'center', 
            }}>
            <Typography variant="h7" 
                        component="div" sx={{ 
                          fontWeight: 'bold',
                          color: 'white', 
                          margin: '10px', 
                          padding: '10px', 
                          borderRadius: '10px', 
                          border: '2px solid', 
                          borderColor: 'rgba(255, 0, 0, 0.5)', 
                          cursor: 'pointer', }}
            onClick={() => setGenreRank(genre)}>
              {genre}
            </Typography>
          </Box>
        ))}
      </Box>
      <Button variant='text'
      sx={{ 
        fontWeight: 'bold',
        color: 'white',
        bgcolor: 'rgba(15, 15, 15, 1)',
        marginTop: '20px', 
        padding: '10px', 
        cursor: 'pointer', }} 
        onClick={() => setDoneWithGenre(true)}>
        Done
        </Button>
    </>
  )
}

export default RecChoice