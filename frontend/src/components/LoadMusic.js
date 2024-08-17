import { useEffect, useState, useRef } from 'react';
import { Typography, Box, Grid, Card, CardMedia, CardContent, Link, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import Tooltip from '@mui/material/Tooltip';
import RefreshIcon from '@mui/icons-material/Refresh'; 
import Loading from './Loading';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

export default function LoadMusic({ genreRank, setGenreRank, mood, colors }) {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [playingTrack, setPlayingTrack] = useState(null);
    const audioRef = useRef(null);
    const [artistsSeeds, setArtistsSeeds] = useState([]);
    const [artists, setArtists] = useState([]);
    const [songSeeds, setSongSeeds] = useState([]);
    const [trackRank, setTrackRank] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch('/api/getMusic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ genreRank, mood, artistsSeeds, songSeeds })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            setTracks(data.tracks);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error while fetching:', error);
        });
    }, [genreRank, mood, artistsSeeds, songSeeds]);

    const reRecommend = () => {
      setSongSeeds(prevSongSeeds => {
          const updatedSongSeeds = [...prevSongSeeds];
          trackRank.forEach(trackId => {
              if (!updatedSongSeeds.includes(trackId)) {
                  updatedSongSeeds.push(trackId);
              }
          });
          return updatedSongSeeds;
      })
  
      setArtistsSeeds(prevArtistsSeeds => {
          const updatedArtistsSeeds = [...prevArtistsSeeds];
          artists.forEach(artist => {
              if (artist && !updatedArtistsSeeds.includes(artist)) {
                  updatedArtistsSeeds.push(artist);
              }
          });
          return updatedArtistsSeeds;
      });
  
      setTrackRank([]);
      setArtists([]);
  };  

  const handleRemoveTrack = (indexToRemove, liked) => {
    setTracks(prevTracks => {
        const updatedTracks = prevTracks.filter((_, index) => index !== indexToRemove);

        if (liked) {
            const track = prevTracks[indexToRemove];

            setArtists([...artists, track.artists[0].id]);

            setTrackRank(prevTrackRank => {
                if (!prevTrackRank.includes(track.id)) {
                    return [...prevTrackRank, track.id];
                }
                return prevTrackRank;
            });
        }

        if (updatedTracks.length === 0) {
            reRecommend();
        }
        return updatedTracks;
    });
};

    const handlePlayPause = (trackUrl) => {
      if (playingTrack === trackUrl) {
          audioRef.current.pause();
          setPlayingTrack(null);
      } else {
          if (audioRef.current) {
              audioRef.current.pause();
          }
          audioRef.current = new Audio(trackUrl);
          audioRef.current.play();
          setPlayingTrack(trackUrl);
      }
  };

    const trackItems = tracks.slice(0, 7).map((track, index) => (
        <Grid item xs={12} sm={index === 0 ? 12 : 6} md={index === 0 ? 12 : 4} key={index} 
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Card
                sx={{
                    maxWidth: index === 0 ? '50%' : 400,
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: 3,
                    border: 2,
                    borderColor: colors.musicColor,
                    position: 'relative', 
                }}
            >
                <Box
                    component="span"
                    sx={{
                    position: 'absolute',
                    top: 0,
                    left: -20,  
                    width: 40,  
                    height: 40,
                    backgroundColor: 'rgba(0,0,0,0.5)', 
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 5,
                    fontSize: 50,  
                    borderRadius: '50%',  
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', 
                    }}
                >
                    {index + 1} 
                </Box>

                <Tooltip title="Already listened to it">
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 40,
                            right: -10,  
                            width: 20,
                            height: 20,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'rgba(0,255,0,0.8)', 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 3,
                            fontSize: 20,  
                            borderRadius: '50%',  
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', 
                        }}
                        onClick={() => handleRemoveTrack(index, true)}
                    >
                        <CheckCircleIcon />
                    </IconButton>
                </Tooltip>
                                        
                <Tooltip title="Don't like it">
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: -10,
                            right: -10,  
                            width: 20,
                            height: 20,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'red', 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 3,
                            fontSize: 20,  
                            borderRadius: '50%',  
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', 
                        }}
                        onClick={() => handleRemoveTrack(index, false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
                
                <CardMedia
                    component="img"
                    height={index === 0 ? 180 : 250}
                    image={track.album.images[0]?.url || track.album.images[1]?.url || track.album.images[2]?.url}
                    alt={track.name}
                    sx={
                        index === 0 
                          ? { objectFit: 'cover' } 
                          : { 
                              objectFit: 'cover', 
                              marginTop: '-4px',
                              borderRadius: '8px'  
                            }
                      }
                />
                
                <CardContent sx={{bgcolor: 'rgba(0,0,0,0.4)'}}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold'}}>
                    {track.name} 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Artists: {track.artists?.map(artist => artist.name).join(', ') || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    Album: {track.album.name || 'N/A'}
                    </Typography>
                    {/* Inside the CardContent where the preview button is */}
                    <Typography variant="body2" color="text.primary">
                        {track.preview_url ? (
                            <>
                                <IconButton 
                                    onClick={() => handlePlayPause(track.preview_url)} 
                                    color="primary"
                                >
                                    {playingTrack === track.preview_url ? <PauseIcon /> : <PlayArrowIcon />}
                                </IconButton>
                                <span>Listen to Preview</span>
                            </>
                        ) : (
                            'No Preview Available'
                        )}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        <Link href={track.external_urls.spotify} target="_blank" rel="noopener">
                            Listen on Spotify
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    ));

    return (
        <Box sx={{ 
            flexGrow: 1, 
            padding: 1, 
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
                    }}>
            {loading && <Loading rec={'Music'} color={colors.musicColor}/>}
            {!loading && <>
            <Tooltip title="Get More Recommendations">
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,  
                        width: 20,
                        height: 20,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 3,
                        fontSize: 20,  
                        borderRadius: '50%',  
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', 
                    }}
                    onClick={() => reRecommend()}
                >
                    <RefreshIcon />
                </IconButton>
            </Tooltip>
            <h4>Music Recommendations</h4>
            <Grid container spacing={2} sx={{ height: '100%'}}>
                {trackItems}
            </Grid>
            </>
            }
        </Box>
    );
}