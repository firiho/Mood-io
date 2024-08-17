import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import streamingAvailability from 'streaming-availability';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 5001;

globalThis.fetch = fetch;

app.use(cors());
app.use(bodyParser.json());

async function getMovies(genreRank, mood) {
    try {
        const RAPID_API_KEY = process.env.RAPID_API_KEY;
        const client = new streamingAvailability.Client(new streamingAvailability.Configuration({
            apiKey: RAPID_API_KEY
        }));
        const cleanedAndSortedGenres = Object.keys(genreRank)
        .map(genre => {
            let lowerGenre = genre.toLowerCase();
            if (lowerGenre === 'science fiction') {
                return { genre: 'scifi', rank: genreRank[genre] };
            } else if (lowerGenre === 'talk show') {
                return { genre: 'talk', rank: genreRank[genre] };
            }
            return { genre: lowerGenre, rank: genreRank[genre] };
        })
        .sort((a, b) => b.rank - a.rank) 
        .slice(0, 3)  
        .map(item => item.genre); 

        const data = await client.showsApi.searchShowsByFilters({
            country: "us",
            genres: cleanedAndSortedGenres,
            orderBy: "rating",
            genres_relation: "and",
            keywords: mood,
        });
        return data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}

async function getMusic(genreRank, mood, artistsSeeds, songSeeds) {
    try {
        const cleanedAndSortedGenres = Object.keys(genreRank)
        .map(genre => {
            let lowerGenre = genre.toLowerCase();
            if (lowerGenre === 'r&b') {
                return { genre: 'r-n-b', rank: genreRank[genre] };
            }
            return { genre: lowerGenre, rank: genreRank[genre] };
        })
        .sort((a, b) => b.rank - a.rank)  
        .slice(0, 2) 
        .map(item => item.genre);

        const happyMoods = ['Happy', 'Hopeful', 'Energetic', 'Motivated', 'Loving'];
        const sadMoods = ['Sad', 'Nostalgic', 'Depressed', 'Peaceful'];

        const limit = 10;
        const market = 'US';
        const seedArtists = artistsSeeds.slice(0, 1);
        const seedGenres = cleanedAndSortedGenres;
        const seedTracks = songSeeds.slice(0, 2);
        const minPopularity = 50;

        let minTempo = 88;
        let maxTempo = 120;

        if (happyMoods.includes(mood)) {
            minTempo = 100;
            maxTempo = null; 
        } else if (sadMoods.includes(mood)) {
            minTempo = null;
            maxTempo = 100;
        }
        let url = `https://api.spotify.com/v1/recommendations?limit=${limit}&market=${market}&min_popularity=${minPopularity}`;

        if (seedArtists && seedArtists.length > 0) {
            url += `&seed_artists=${seedArtists.join(',')}`;
        }
        if (seedGenres && seedGenres.length > 0) {
            url += `&seed_genres=${seedGenres.join(',')}`;
        }
        if (seedTracks && seedTracks.length > 0) {
            url += `&seed_tracks=${seedTracks.join(',')}`;
        }
        if (minTempo) {
            url += `&min_tempo=${minTempo}`;
        }
        if (maxTempo) {
            url += `&max_tempo=${maxTempo}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Network response was not ok: ${response.status} - ${errorText}`);
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching music:", error);
        throw error;
    }
};

app.get('/api', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.post('/api/getMovies', async (req, res) => {
    const { genreRank, mood } = req.body;
    try {
        const movies = await getMovies(genreRank, mood);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
});

app.post('/api/getMusic', async (req, res) => {
    const { genreRank, mood, artistsSeeds, songSeeds } = req.body;
    try {
        const songs = await getMusic(genreRank, mood, artistsSeeds, songSeeds);
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch music" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
