import { Typography, Box} from '@mui/material';

function MoodSelection({ moods, setMood }) {
  return (
    <>
      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white', padding: '20px'}}>
        Hello there, what's your mood today?
      </Typography>

      <Box sx={{ display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center', 
        }}>
        {moods.map((mood, index) => (
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
            onClick={() => setMood(mood)}>
              {mood}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default MoodSelection