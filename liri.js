require("dotenv").config();


// twitter
var Twitter = require('twitter');

var fs=require("fs");
var keys=require("./keys.js");

var userInquiry= process.argv;

if(userInquiry[2]==="my-tweets"){
	gettingTweets();
}

else if (userInquiry[2]==="spotify-this-song"){
	searchSong();
}

else{
	console.log("Command not recognized");
}

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
var Spotify = require('node-spotify-api');
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
    console.log("\n=========================================================================")
  })
  .catch(function(err) {
    console.log(err);
  });
}



