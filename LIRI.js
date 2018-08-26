require("dotenv").config();
var keys = require('./keys');
var bandsintown = require('bandsintown')(keys.bandsInTown.app_id);
// var spotify = new Spotify(keys.spotify);

var arg1 = process.argv[2];
var arg2 = process.argv.slice(3).join(' ');


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
        console.log(i.formatted_datetime);
        console.log('--------------------');
      });
    }
    else{
      console.log('No events found.');
    };
  });
};

function spotifyThis() {

};

function movieThis() {

};

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
      movieThis(search);
      break;
    case 'do-what-it-says':
      doWhat();
      break;
    default:
      console.log('needs correct arguments');
  };
};

selectedCommand(arg1, arg2)