require("dotenv").config();

var keys = require('./keys');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var search = process.argv.slice(3).join('+');


function concertThis() {

};

function spotifyThis() {

};

function movieThis() {

};

function doWhat() {

};


function selectedCommand(cmd, srch) {
  switch (cmd) {
    case 'concert-this':
      concertThis();
      break;
    case 'spotify-this-song':
      spotifyThis();
      break;
    case 'movie-this':
      movieThis();
      break;
    case 'do-what-it-says':
      doWhat();
      break;
    default:
      console.log('needs correct arguments');
  };
};

selectedCommand(command, search)