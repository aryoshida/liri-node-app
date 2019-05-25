require("dotenv").config();
const fs = require("fs");
const keys = require("./keys.js"); 
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");

var command = process.argv[2];
var value = process.argv[3];

if(command === "concert-this"){
    concertSearch(value);
    if(!value) {
        value = "jon bellion";
    }
} else if(command === "spotify-this-song"){
    songSearch(value);
    if(!value) {
        value = "Never Say Never";
    }
} else if(command === "movie-this"){
    if(!value) {
        value = "Mr. Nobody";
    }
    movieSearch(value);
} else if(command === "do-what-it-says"){
    doWhatItSays();
}

function concertSearch(value){
    // commands that need to be executed
    // concert-this
        // Name of the venue
        // Venue location
        // Date of the Event (use moment to format this as "MM/DD/YYYY")
    var URL = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function(response){
        var jsonData = response.data[0];
        var concertData = [
            "Venue Name: " + jsonData.venue.name,
            "Venue Location: " + jsonData.venue.country + " " + jsonData.venue.city,
            "Event Date: " + jsonData.datetime
        ].join("\n\n");
        console.log(concertData);
    });
}

function songSearch(value){
    // spotify-this-song
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from
    
    spotify.search({ type: "track", query: value }, function(err, data){
        if(err){
            return console.log("error: " + err);
        }

        var artists = data.tracks.items[0].artists;
        console.log("Artist for this track: ");
        for(var i = 0; i < artists.length; i++){
            console.log("\t" + artists[i].name);
        }

        console.log("Song Name: ");
        console.log("\t" + value);

        console.log("Preview URL: ");
        console.log("\t" + data.tracks.items[0].preview_url);
        
        console.log("Album Name: ")
        console.log("\t" + data.tracks.items[0].album.name);
        
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

    var URL = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
    axios.get(URL).then(function(response){
        var jsonData = response.data;
        var movieData = [
            "Title: " + value,
            "Release Year: " + jsonData.Released,
            "IMDB Rating: " + jsonData.imdbRating,
            "Rotten Tomatoes Rating: " + getRottenTomatoesRating(jsonData.Ratings),
            "Country: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Movie Plot: " + jsonData.Plot,
            "Actors: " + jsonData.Actors
        ].join("\n\n");
        console.log(movieData);
    });
}

function getRottenTomatoesRating(ratings) {
    for(var i = 0; i < ratings.length; i++){
        if(ratings[i].Source === "Rotten Tomatoes"){
            return ratings[i].Value;
        } 
    } return "N/A";
}

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err){
            return console.log(err);
        }
        var dataArray = data.split(",");
        console.log(data);
        var command = dataArray[0];
        var value = dataArray[1];
        songSearch(value);
    });
}