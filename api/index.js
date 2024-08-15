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

    const [moviesList, setMoviesList] = useState([]);

    if (moviesList.length !== 0) {
        return moviesList;
    }
    try {
        const RAPID_API_KEY = process.env.RAPID_API_KEY;
        const client = new streamingAvailability.Client(new streamingAvailability.Configuration({
            apiKey: RAPID_API_KEY
        }));

        // clean up genreRank
        const genres = Object.keys(genreRank)
        .map(genre => {
            let lowerGenre = genre.toLowerCase();

            // Handle specific replacements
            if (lowerGenre === 'science fiction') {
                return 'scifi';
            } else if (lowerGenre === 'talk show') {
                return 'talk';
            }
            return lowerGenre;
        });

        const data = await client.showsApi.searchShowsByFilters({
            country: "us",
            genres: genres,
            orderBy: "rating",
            genres_relation: "and",
            keywords: mood,
        });
        setMoviesList(data);
        return data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
