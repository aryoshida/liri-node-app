require("dotenv").config();
const fs = require("fs");
const keys = require("./keys.js"); 
const spotify = new Spotify(keys.spotify);
const axios = require("axios");

var command = process.argv[2];
var value = process.argv[3];

if(command === "concert-this"){
    concertSearch();

} else if(command === "spotify-this-song"){
    songSearch();

} else if(command === "movie-this"){
    movieSearch();

} else{

}

function concertSearch(value){
    // commands that need to be executed
    // concert-this
        // Name of the venue
        // Venue location
        // Date of the Event (use moment to format this as "MM/DD/YYYY")
    var URL = ""
    axios.get(URL).then(function(response){
        var jsonData = response.data;
        var concertData = [
            "Venue Name: " + jsonData.
            "Venue Location: " = jsonData.
            "Event Date: " = jsonData.
        ].join("\n\n)";
    });
}

function songSearch(value){
    // spotify-this-song
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from
    var URL = ""
    axios.get(URL).then(function(response){
        var jsonData = response.data;
        var songData = [
            "Artist(s): " + jsonData.
            "Song Name: " + jsonData.
            "Link to Song: " + jsonData.
            "Album: " + jsonData.
        ].join("\n\n");
    });
}

function movieSearch(value){
    // movie-this
        // Title of the movie.
        // Year the movie came out.
        // IMDB Rating of the movie.
        // Rotten Tomatoes Rating of the movie.
        // Country where the movie was produced.
        // Language of the movie.
        // Plot of the movie.
        // Actors in the movie
    var URL = ""
    axios.get(URL).then(function(response){
        var jsonData = response.data;
        var movieData = [
            "Title: " + jsonData.
            "Release Year: " + jsonData.
            "IMDB Rating: " + jsonData.
            "Rotten Tomatoes Rating: " + jsonData.
            "Country: " + jsonData.
            "Language: " + jsonData.
            "Movie Plot: " + jsonData.
            "Actors: " + jsonData.
        ].join("\n\n");
    });
}


    // do-what-it-says
        // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
        // Edit the text in random.txt to test out the feature for movie-this and concert-this.