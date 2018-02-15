require("dotenv").config();

var userInquiry= process.argv;
var keys=require("./keys.js");
var fs=require("fs");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

if(userInquiry[2]==="my-tweets"){
	gettingTweets();
}
else if (userInquiry[2]==="spotify-this-song"){
	searchSong();
}
else if (userInquiry[2]==="movie-this"){
	movieSearch();
}
else{
	console.log("Command not recognized");
	console.log("The available commands are: my-tweets, spotify-this-song and movie-this")
}

// twitter

function gettingTweets(){
	var client = new Twitter(keys.twitter);
	var query="";

	if (userInquiry[3]==="" || userInquiry[3]===undefined) {
		console.log("Please introduce a term to find");
		console.log("Redirecting to the best team in the World");
		query="realmadrid";
	}

	else{
		query=userInquiry[3]
	}

	var params = {screen_name: query};
	console.log("Your search term was: "+query)

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	// console.log(tweets);
	  	for (var i = 0; i < 20; i++) {
		   	console.log("\n==============================================================")
		  	console.log(tweets[i].created_at)
		    console.log(tweets[i].text);
		    console.log("===============================================================")
	    }
	  }
	  else{
	  	console.log(error);
	  }
	});
}

//Spotify

function searchSong(){
var song="";

var spotify = new Spotify(keys.spotify);

if (userInquiry[3] === "" || (userInquiry[3] === undefined)) {

	console.log("Redirecting to a song of my choice");
	console.log("Please introduce a song name");
	song = "Papercut";
}
else{
	for (var i = 3; i < userInquiry.length; i++) {
		if (i===userInquiry.length-1) {
			song = song +  userInquiry[i];
		}
		else{
			song = song +  userInquiry[i]+ " ";
		}
	}
}

spotify
  .search({ type: 'track', query: song })
  .then(function(response) {
  	console.log("\n=========================================================================")
    console.log("Name of the band: " + response.tracks.items[0].album.artists[0].name);
    console.log("Name of the song: " + response.tracks.items[0].name);
    console.log("Name of the album: " + response.tracks.items[0].album.name);
    console.log("URL link: " + response.tracks.items[0].album.external_urls.spotify);
    console.log("=========================================================================")
  })
  .catch(function(err) {
    console.log(err);
  });
}

//OMDB

function movieSearch(){
	var movie="";

	if (userInquiry[3] === "" || (userInquiry[3] === undefined)) {
		console.log("Redirecting to a movie of my choice");
		console.log("Please next time introduce a movie name");
		movie = "interstellar";
	}
	else{
		for (var i = 3; i < userInquiry.length; i++) {
			if (i===userInquiry.length-1) {
				movie = movie +  userInquiry[i];
			}
			else{
				movie = movie +  userInquiry[i]+ "+";
			}
		}
	}
	console.log(movie);

	var request = require("request");

	request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

	  if (!error && response.statusCode === 200) {
	  	console.log("\n=========================================================================")
	    console.log("The movie's title is: " + JSON.parse(body).Title);
	    console.log("The movie's year is: " + JSON.parse(body).Year);
	    console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
	    console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
	    console.log("The movie's production Country is: " + JSON.parse(body).Country);
	    console.log("The movie's language is: " + JSON.parse(body).Language);
	    console.log("The movie's plot is: " + JSON.parse(body).Plot);
	    console.log("The movie's actors are: " + JSON.parse(body).Actors);
	    console.log("=========================================================================")
	  }
	});
}