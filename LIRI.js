// GLOBAL VARIABLES
// =========================
require("dotenv").config();
var keys = require('./keys');
var fs = require('fs');
var request = require('request');
var bandsintown = require('bandsintown')(keys.bandsInTown.app_id);
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var inquirer = require('inquirer');

// var arg1 = process.argv[2];
// var arg2 = process.argv.slice(3).join(' ');
// using iquirer.prompt instead, down below

// FUNCTIONS
// =========================
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
      fs.appendFile('./log.txt', 'ok\n', function(err) {
        if (err) {
          console.log(err);
        };
      });
    }
    else{
      console.log('No events found.');
      fs.appendFile('./log.txt', 'No events found\n', function(err) {
        if (err) {
          console.log(err);
        };
      });
    };
  });
};

function spotifyThis(song) {
  spotify
  .search({ type: 'track', query: song, limit: 1 })
  .then(function(response) {
    if (response.tracks.items.length) {
      console.log('Song: ' + song);
      var artists = [];
      response.tracks.items[0].artists.forEach(i => {
        artists.push(i.name);
      })
      console.log('Artist(s): ' + artists.join(', '));
      console.log('Album: ' + response.tracks.items[0].album.name);
      if (response.tracks.items[0].preview_url) {
        console.log('Preview: ' + response.tracks.items[0].preview_url);
      }
      else {
        console.log('No preview available');
      };
      fs.appendFile('./log.txt', 'ok\n', function(err) {
        if (err) {
          console.log(err);
        };
      });
    }
    else {
      console.log('Song not found. Here is "The Sign", anyway...');
      spotifyThis('The Sign');
    };
  })
  .catch(function(err) {
    console.log(err);
    fs.appendFile('./log.txt', 'error(' + err + ')\n', function(err) {
      if (err) {
        console.log(err);
      };
    });
  });
};

function movieThis(title) { 
  var queryURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + keys.omdb.omdbKey;
  // console.log(queryURL);
  request(queryURL, function(error, response, body){
    if (response === false) {
      var resp = JSON.parse(body);
      console.log(resp.Title);
      console.log(resp.Year);
      console.log('IMDB rating: ' + resp.Ratings[0].Value);
      console.log('Rotten Tomatoes rating: ' + resp.Ratings[1].Value);
      console.log(resp.Country);
      console.log(resp.Language);
      console.log(resp.Plot);
      console.log('Actors: ' + resp.Actors);
      fs.appendFile('./log.txt', 'ok\n', function(err) {
        if (err) {
          console.log(err);
        };
      });
    }
    else {
      console.log('Movie not found');
      fs.appendFile('./log.txt', 'movie not found\n', function(err) {
        if (err) {
          console.log(err);
        };
      });
    }
  });
};

function doWhat() {
  fs.readFile('./TheTextFileOfTruth.txt', "utf8", function(error, data) {
    if (error) {
      return console.log(error);
      fs.appendFile('./log.txt', 'error(' + error + ')\n', function(err) {
        if (err) {
          console.log(err);
        };
      });
    };
    var dataArr = data.split(",");
    if (dataArr[0] !== 'do-what-it-says') {
      fs.appendFile('./log.txt', 'ok\n', function(err) {
        if (err) {
          console.log(err);
        };
      });
      selectedCommand(dataArr[0], dataArr[1]);
    }
    else {
      console.log("Don't try to throw me into an infinite loop, yo.");
      fs.appendFile('./log.txt', 'aborted, escaped loop\n', function(err) {
        if (err) {
          console.log(err);
        };
      });
    };
  });
};

function selectedCommand(command, search) {
  var logEntry = moment().format() + ' CALLED selectedCommand(' + command + ', ' + search + ') RESULT: ';
  fs.appendFile('./log.txt', logEntry, function(err) {
    if (err) {
      console.log(err);
    };
  });
  switch (command) {
    case 'concert this':
      concertThis(search);
      break;
    case 'spotify this song':
      spotifyThis(search);
      break;
    case 'movie this':
      if (search) {
        var title = search.replace(' ', '+');
        movieThis(title);
      }
      else {
        console.log('No movie entered. Showing results for "Mr. Nobody" instead:');
        movieThis('Mr.+Nobody');
      };
      break;
    case 'do what it says (the Text File of Truth)':
      doWhat();
      break;
    default:
      console.log('aborted, invalid arguments');
      fs.appendFile('./log.txt', 'aborted, invalid arguments\n', function(err) {
        if (err) {
          console.log(err);
        };
      });
  };
};

// CALLS
// =========================
inquirer.prompt([
  {
    type: "list",
    name: "command",
    message: "Choose command:",
    choices: ["concert this", "spotify this song", "movie this", "do what it says (the Text File of Truth)"]
  },
  {
    type: "input",
    name: "search",
    message: "Enter a search (artist, song, movie, or nothing, if you chose to leave your fate to the Text File of Truth):"
  }
]).then(function(input) {
  selectedCommand(input.command, input.search);
});

// add error-catching for no search entered