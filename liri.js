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
else if (userInquiry[2]==="zombie-game"){
	launchGame();
}
else{
	console.log("Command not recognized");
	console.log("The available commands are: my-tweets, spotify-this-song, movie-this or zombie-game")
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
	  	for (var i = 0; i < 20; i++) {
		  	console.log("\n=========================================================================")
		    console.log("Name of the band: " + response.tracks.items[i].album.artists[0].name);
		    console.log("Name of the song: " + response.tracks.items[i].name);
		    console.log("Name of the album: " + response.tracks.items[i].album.name);
		   	console.log("URL link (preview): " + response.tracks.items[i].preview_url);
		    console.log("URL link: " + response.tracks.items[i].album.external_urls.spotify);
		    console.log("=========================================================================")
	    }
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


//ZOMBIE GAME (custom)

function launchGame() {
	var zombieHealth=100;
	var humanHealth=10;
	var humanArray=[1,7,15,20,45];
	var zombieArray=[0,3,0,5,0,100,0];

	function humanAttack(a){
		var damage= a.sort(function (a,b){ return 0.5-Math.random() })
		return(damage);
	}

	battle();

	function zombieAttack(){
		var damage= Math.floor(Math.random()*7);
		return (zombieArray[damage]);
	}

	function compare(humanA, zombieA){
		humanHealth = humanHealth - zombieA;
		zombieHealth = zombieHealth - humanA;

		console.log("The Zombie life is ", zombieHealth);

		if(humanHealth<=0 && zombieHealth<=0){
			console.log("You heroicly killed the zombie, but you died");
		}
		else if(humanHealth<=0 && zombieHealth>=0){
			console.log("YOU HAVE BEEN EATEN")
		}
		else if (humanHealth>=0 && zombieHealth<=0){
			console.log("You killed the Zombie!")
		}
		else{
			if (zombieA>0) {
				console.log("Shit! The Zombie bit you, you are bleeding!");
				console.log("Your remaining life is: " + humanHealth);
			}
			else{
				console.log("you dodged the zombie, you lucky bastard")
			}

			console.log("");
			battle();
		}

	}

	function battle(){

		var inquirer = require("inquirer");

		inquirer
		  .prompt([
			{
		      type: "list",
		      message: "Try to stay alive, pick a number between 1 and 5 (try not to take 100 damage!)",
		      choices: ["1", "2", "3","4", "5"],
		      name: "damage"
		    }

		  ])
		  .then(function(inquirerResponse) {
		    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
		
		 var humanTotal=humanAttack(humanArray)[inquirerResponse.damage-1];
		 console.log("");
		if (humanTotal==1) {
			console.log("You slapped the Zombie!")
		}
		else if (humanTotal==7){
			console.log("You have Pistol Whipped the Zombie")
		}
		else if (humanTotal==15){
			console.log("You smashed the zombies ribs with a Batt")
		}
		else if(humanTotal==20){
			console.log("The zombie took an arrow to the Knee")
		}
		else if(humanTotal==45){
			console.log("you have BLASTED the zombie with a SHOTTY")
		}
		console.log("Your damage was: ", humanTotal);
		var zombieTotal =zombieAttack();
		if (zombieTotal==100) {
			console.log("The Zombie ate your BRAINS!")
		}
		 console.log("Zombie swing: ",zombieTotal);
		 console.log("");

		 compare(humanTotal, zombieTotal);
		});
	}
}