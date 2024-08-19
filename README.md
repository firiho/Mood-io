# Mood-io
 A movie and music recommendation web app and algorithm based on users' moods.


[![Demo Video](demos/demo.gif)](demos/demo.mp4)


## Description

Mood-io uses a series of questions and decisions based on them to determine the user's best recommendation for a movie or song. For example, if a user is feeling depressed, they don't want a song with a tempo higher than 100 BPM, and more.

If a user has watched a movie/listened to a song, the algorithm will take that into account and recommend something similar.

## Installation

To install Mood-io, simply clone the repository and run the following command in the root directory:

Cd into /api and run `npm install` to install the necessary dependencies.
Get a Spotify API key and add it to the .env file.
Get a RapidAPI key for Streaming Availability API and add it to the .env file.
Run `node index.js` to start the server

Cd into frontend and run `npm install` to install the necessary dependencies.
Run `npm start` to start the frontend.