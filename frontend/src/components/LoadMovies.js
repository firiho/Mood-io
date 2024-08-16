import { useEffect, useState } from 'react';
import { Typography, Box, Grid, Card, CardMedia, CardContent, Link } from '@mui/material';

export default function LoadMovies({ genreRank, mood, colors }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
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
            console.log('Successfully fetched:', data);
        })
        .catch(error => {
            console.error('Error while fetching:', error);
        });
    }, [genreRank, mood]); 

    

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
            {/* SVG or Number Display */}
            <Box
                component="span"
                sx={{
                position: 'absolute',
                top: 10,
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
                {index + 1}  {/* Display the movie's number */}
            </Box>

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
            padding: 1, 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
                    }}>
            <h4>Movies & TV Series Recommendations</h4>
            <Grid container spacing={2} sx={{ height: '100%'}}>
                {movieItems}
            </Grid>
        </Box>
    );
}
