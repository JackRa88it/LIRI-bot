# LIRI-bot
A CLI application using Node.
This was created as a homework assignment for the UC Berkeley Coding Boot Camp to practice with node modules, API calls, and log files. This is a really simple app, too, so I'll assume that anyone reading this readme is maybe learning to code as well, and would like a lot of basic information.

## What is LIRI-bot?
running LIRI.js from the terminal will prompt you with a few choices. You can:

- look up a movie title, which will search OMDB and return some basic information about the movie.
- look up a song title, which will search Spotify and return basic song info.
- look up a musician/band, which will search Bands in Town and return a list of upcoming concerts.
- leave it up to the Text File of Truth, which itself contains a command to do one of the three previous options.

The results are logged to the console for viewing, and a very basic record of the request and result is appended to log.txt.

## How to set it up
This program uses dotenv to protect private API keys from being distributed. That means this repository comes with everything you need **except** the node modules it is dependent on (the package dependencies, below) and the .env file containing your API keys. I'll explain how to install the package dependencies and your own set of API keys:

1. **Install package dependencies:** after cloning down the repo, navigate to the folder in your terminal. Type the command `npm install` and hit enter. This will read the package.json file, get the list of node module dependencies, and automatically install them. You should see a node_modules folder appear in the repo at this point. Here is a breakdown of the dependencies for interested geeks:

- [request](https://www.npmjs.com/package/request): used to create and send URL requests which attempt to access the other APIs.
- [moment](https://www.npmjs.com/package/moment): used to format dates for display.
- [inquirer](https://github.com/SBoudrias/Inquirer.js#readme): used to enable well-formatted user prompts in the command line (including list and checkbox questions).
- [Bands in Town](https://www.npmjs.com/package/bandsintown): used to search for upcoming concerts for a particular artist.
- [node Spotify API](https://www.npmjs.com/package/node-spotify-api): used to search for song information.
- [OMDB](https://www.npmjs.com/package/omdb): used to search for movie information.
- [dotenv](https://www.npmjs.com/package/dotenv): this allows personal API keys (needed to make API calls) to be kept in a separate .env file and accessed by the intermediary keys.js file. You must create an .env file and populate it with your own API keys for the app to work on your computer.

2. **Get necessary API keys:** to be able to search [OMDB](http://www.omdbapi.com/apikey.aspx?__EVENTTARGET=freeAcct&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=%2FwEPDwUKLTIwNDY4MTIzNQ9kFgYCAQ9kFggCAQ8QDxYCHgdDaGVja2VkZ2RkZGQCAw8QDxYCHwBoZGRkZAIFDxYCHgdWaXNpYmxlZ2QCBw8WAh8BaGQCAg8WAh8BaGQCAw8WAh8BaGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgMFC3BhdHJlb25BY2N0BQhmcmVlQWNjdAUIZnJlZUFjY3S0gwjl9jaVfARil8Yy9nisxxBo9QY1d1aRp4k6s2f83g%3D%3D&__VIEWSTATEGENERATOR=5E550F58&__EVENTVALIDATION=%2FwEdAAW77Mkj8S6lO0evPKayW3ucmSzhXfnlWWVdWIamVouVTzfZJuQDpLVS6HZFWq5fYpioiDjxFjSdCQfbG0SWduXFd8BcWGH1ot0k0SO7CfuulGmtD1h9A7%2B3Av2cTK2Z2qbhaCErXs89aADzZLPwy5pm&at=freeAcct&Email=), [Spotify](https://developer.spotify.com/documentation/web-api/quick-start/), and [Bands In Town](http://www.artists.bandsintown.com/bandsintown-api), you must request API keys from them directly. The links in the previous sentence will take you to the relevant web pages for this. If you already have a Spotify account, you can use it to sign up as a developer (for free) and they will give you two keys to use (the other APIs only require a single key each).

3. **Add said API keys to your .env file:** For this step, navigate to the LIRI-bot folder on your computer. Create a new file called simply ".env". Open it with any text editor, and add this text to it, replacing the 12345s with your actual API keys from the previous step:

```
SPOTIFY_ID=12345
SPOTIFY_SECRET=12345
BIT_APP_ID=12345
OMDB_KEY=12345
```

After completing this step, you are ready to run the app!

## Using LIRI-bot
From the terminal (and in the LIRI-bot folder), type `node LIRI.js` and follow the on-screen prompts! Not much else to it. You can change the Text File of Truth to say whatever command and search you would like, but it must follow the exact formatting you found there to begin with (matching one of the three other commands to the letter) or it will not work.

You can also see the results of each command saved into the log.txt file, which includes the time stamp, the command executed, the arguments it was given, and the result (ok or failure mode). This is my attempt to make a somewhat useful log file that records status information at relevant points in the script. For such a simple app, I figured that this information was enough, and that the practice lies in deciding where in the code to log what information (and, by doing so, practice error-catching). This is a submitted homework assignment, but is a work in progress like all my other assignments, and I welcome any and all feedback! Thank you for reading this.