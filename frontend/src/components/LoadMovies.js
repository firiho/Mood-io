import { useEffect, useState } from 'react';
import { Typography, Box, Grid, Card, CardMedia, CardContent, Link, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import Tooltip from '@mui/material/Tooltip';
import RefreshIcon from '@mui/icons-material/Refresh'; 
import Loading from './Loading';

export default function LoadMovies({ genreRank, setGenreRank, mood, colors }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [movieRank, setMovieRank] = useState({});

    useEffect(() => {
        setLoading(true);
        fetch('/api/getMovies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ genreRank, mood })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            setMovies(data.shows);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error while fetching:', error);
        });
    }, [genreRank, mood]); 

    const reRecommend = () => {
        setGenreRank(prevGenreRank => {
            const updatedGenreRank = { ...prevGenreRank };
    
            // Iterate over each genre in movieRank and add it to genreRank
            Object.keys(movieRank).forEach(genre => {
                if (updatedGenreRank[genre]) {
                    updatedGenreRank[genre] += movieRank[genre];
                } else {
                    updatedGenreRank[genre] = movieRank[genre];
                }
            });
    
            return updatedGenreRank;
        });
        setMovieRank({});
    };
    

    const handleRemoveMovie = (indexToRemove, liked) => {
        setMovies(prevMovies => {
            const updatedMovies = prevMovies.filter((_, index) => index !== indexToRemove);
    
            if (liked) {
                const movie = prevMovies[indexToRemove];
                const updatedMovieRank = { ...movieRank };
    
                // Increment the count for each genre of the liked movie
                movie.genres.forEach(genre => {
                    if (updatedMovieRank[genre.name]) {
                        updatedMovieRank[genre.name] += 1;
                    } else {
                        updatedMovieRank[genre.name] = 1;
                    }
                });
    
                setMovieRank(updatedMovieRank);
            }
            // If no movies are left, call reRecommend
            if (updatedMovies.length === 0) {
                reRecommend();
            }
            return updatedMovies;
        });
    };    

    const movieItems = movies.slice(0, 7).map((movie, index) => {
        const uniqueStreamingOptions = movie.streamingOptions?.us?.reduce((acc, option) => {
            if (!acc.has(option.service.name)) {
                acc.set(option.service.name, option.link);
            }
            return acc;
        }, new Map());

        return (
        <Grid item xs={12} sm={index === 0 ? 12 : 6} md={index === 0 ? 12 : 4} key={index} 
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Card
            sx={{
                maxWidth: index === 0 ? 600 : 300,
                borderRadius: 2,
                boxShadow: 3,
                border: 2,
                borderColor: colors.movieColor,
                position: 'relative', 
            }}
            >
            {/* Number Display */}
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

            {/* Check Button */}
            <Tooltip title="Already watched it">
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
                    onClick={() => handleRemoveMovie(index, true)}
                >
                    <CheckCircleIcon />
                </IconButton>
            </Tooltip>
                                    
            {/* Close Button */}
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
                    onClick={() => handleRemoveMovie(index, false)}
                >
                    <CloseIcon />
                </IconButton>
            </Tooltip>
            <CardMedia
                component="img"
                height={index === 0 ? 180 : 250}
                image={
                index === 0 
                    ? movie.imageSet?.horizontalPoster?.w1440 || movie.imageSet?.horizontalPoster?.w1080 || movie.imageSet?.horizontalPoster?.w720 || movie.imageSet?.horizontalPoster?.w480 
                    : movie.imageSet?.verticalPoster?.w720 || movie.imageSet?.verticalPoster?.w600 || movie.imageSet?.verticalPoster?.w480 || movie.imageSet?.verticalPoster?.w360
                }
                alt={movie.title}
                sx={
                    index === 0 
                      ? { objectFit: 'cover' } 
                      : { 
                          objectFit: 'cover', 
                          marginTop: '-4px',
                          // overflow: 'visible', 
                          borderRadius: '8px'  
                        }
                  }
            />
            <CardContent sx={{bgcolor: 'rgba(0,0,0,0.4)'}}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold'}}>
                {movie.title} {`(${movie.releaseYear || movie.firstAirYear || 'N/A'})`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Genres: {movie.genres?.map(genre => genre.name).join(', ') || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                Director(s): {movie.directors?.join(', ') || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                Cast: {`${movie.cast?.slice(0, 4).join(', ')}, ...` || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ marginBottom: 1 }}>
                {movie.overview.length > 200 ? `${movie.overview.substring(0, 100)}...` : movie.overview}
                </Typography>
                <Typography variant="body2" color="text.primary">
                <Typography>Watch on: </Typography>
                {uniqueStreamingOptions.size > 0 ? (
                    Array.from(uniqueStreamingOptions.entries()).map(([service, link], index) => (
                    <Link key={index} href={link} target="_blank" rel="noopener" sx={{ marginRight: 1 }}>
                        {service}
                    </Link>
                    ))
                ) : (
                    'N/A'
                )}
                </Typography>
            </CardContent>
            </Card>

        </Grid>
    );
    });
    
    return (
        <Box sx={{ 
            flexGrow: 1, 
            padding: 0, 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
                    }}>
            {loading && <Loading rec={'Movie & TV series'} color={colors.movieColor}/>}
            {!loading && <>
            {/* Check Button */}
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
            <h4>Movies & TV Series Recommendations</h4>
            <Grid container spacing={2} sx={{ height: '100%'}}>
                {movieItems}
            </Grid>
            </>
            }
        </Box>
    );
}
