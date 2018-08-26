require("dotenv").config();
var keys = require('./keys');
var request = require('request');
var bandsintown = require('bandsintown')(keys.bandsInTown.app_id);
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdb = require('omdb');

var arg1 = process.argv[2];
var arg2 = process.argv.slice(3).join(' ');
// use input prompt to ask which command to do, and prompt user for search term


function concertThis(artist) {
  bandsintown
  .getArtistEventList(artist)
  .then(function(events) {
    if(events.length){
      console.log('====================');
      console.log('Upcoming events for ' + artist + ':');
      console.log('====================');
      events.forEach(i => {
        console.log(i.title);
        console.log(i.venue.name);
        console.log(i.formatted_location);
        console.log(moment(i.datetime).format('MM/DD/YYYY'));
        console.log('--------------------');
      });
    }
    else{
      console.log('No events found.');
    };
  });
};

function spotifyThis(song) {
  spotify
  .search({ type: 'track', query: song, limit: 1 })
  .then(function(response) {
    if (response.tracks.items.length) {
      // console.log(JSON.stringify(response, null, 2));
      console.log('Song: ' + song);
      var artists = [];
      response.tracks.items[0].artists.forEach(i => {
        artists.push(i.name);
      })
      console.log('Artist(s): ' + artists.join(', '));
      console.log('Album: ' + response.tracks.items[0].album.name);
      console.log('Preview: ' + response.tracks.items[0].preview_url);
    }
    else {
      console.log('Song not found. Here is "The Sign", anyway...');
      spotifyThis('The Sign');
    }
  })
  .catch(function(err) {
    console.log(err);
  });
};

function movieThis(title) { 
  var queryURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + keys.omdb.omdbKey;
  // console.log(queryURL);
  request(queryURL, function(error, response, body){
    var resp = JSON.parse(body);
    console.log(resp.Title);
    console.log(resp.Year);
    console.log('IMDB rating: ' + resp.Ratings[0].Value);
    console.log('Rotten Tomatoes rating: ' + resp.Ratings[1].Value);
    console.log(resp.Country);
    console.log(resp.Language);
    console.log(resp.Plot);
    console.log('Actors: ' + resp.Actors);
  });
};
// ^dry this up by putting the no-movie-entered logic into the switch case call

function doWhat() {

};


function selectedCommand(command, search) {
  switch (command) {
    case 'concert-this':
      concertThis(search);
      break;
    case 'spotify-this-song':
      spotifyThis(search);
      break;
    case 'movie-this':
      if (search) {
        var title = search.replace(' ', '+');
        movieThis(title);
      }
      else {
        console.log('No movie entered. Showing results for "Mr. Nobody" instead:');
        movieThis('Mr.+Nobody');
      };
      break;
    case 'do-what-it-says':
      doWhat();
      break;
    default:
      console.log('needs correct arguments');
  };
};

selectedCommand(arg1, arg2)