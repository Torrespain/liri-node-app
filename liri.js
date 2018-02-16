require("dotenv").config();

var userInquiry= process.argv;
var keys=require("./keys.js");
var fs=require("fs");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var song="";
var newSong="";

if(userInquiry[2]==="my-tweets"){
	gettingTweets();
}
else if (userInquiry[2]==="spotify-this-song"){
	searchSong();
}
else if (userInquiry[2]==="movie-this"){
	movieSearch();
}
else if (userInquiry[2]==="do-what-it-says"){
	doWhatItSays(function(band){
		newSong=band;
		searchSong();
	});
}
else if (userInquiry[2]==="zombie-game"){
	launchGame();
}
else{
	console.log("Command not recognized");
	console.log("The available commands are: my-tweets, spotify-this-song, movie-this, do-what-it-says or zombie-game");
}

// twitter

function gettingTweets(){
	var client = new Twitter(keys.twitter);
	var query="";

	if (userInquiry[3]==="" || userInquiry[3]===undefined) {
		query="realmadrid";
		console.log("Please introduce a term to find");
		console.log("Redirecting to the best team in the World");

		console.log("                                     0                                     ")
		console.log("                                    00O                                    ")
		console.log("                                  WK00OKW                                  ")
		console.log("                                 WNKKX0KNW                                 ")
		console.log("                           WNNKOOkoxXWNkoO0OKNWW                           ")
		console.log("                        WNX0dclcokoxK00xokoldco0XNW	                    ")
		console.log("                   WNXKXKkclkxxxoloxo,ldlloxkxxlckXXKXNWW                  ")
		console.log("               WWX0ddoclccxkd:.   .ll,cc.   .;dk000kclod0XNW               ")
		console.log("             WNKo:looOx::xOo;:ccc:cdl,coc:ccc:;l00olxkooo:l0NW             ")
		console.log("            WXx::oxdclocxXKXNW   WXOl,ckXW   WNXKKdlxlcdxo:,lKW            ")
		console.log("           WXkc:k0xdxOdcOXNW     WXOoclkXW W   WXXxckOxdx0Oc;dXW           ")
		console.log("           N0l;xXNW WNKd:cONNNNNNXXx...oKXNNNNNNOc;oKNW WNXk:l0N           ")
		console.log("          WXk:l0NWWWXXXo/;kXXXNNXKXXkoxKKKXNNXXXO:llKXXWWWNKo;dX           ")
		console.log("          WXOlo0XXNNNXXXklxXNNOdOXNXkoxKNX0xkXNXxlkXXXNWNXX0l:xXW          ")
		console.log("          WKl?..o0OXKO0NN0xk0K0kkkkkkxxkkkkkkk0K0xd0NN0OXXO0d..lN          ")
		console.log("           N0xx0KKX0kOOkkxdodxd;:xd:'.':dkc;dxdodxkkOkx0XXXKxx0N           ")
		console.log("             WWWNN0dxxkkxc,':xx::xd:,.':dxc:xxc'';okkxxd0NNNWW             ")
		console.log("                  O,:O00xl::clccccllllllccccclc;;cdO0Oc,O                  ")
		console.log("                  NkcllccldxkO0KKXXNNNNNXXKK0OkxolccllcxN                  ")
		console.log("                WN0xddk0XNW WNXK00OOOOOOO00KXNW WNX0kddx0N                 ")
		console.log("              NOxxk0NWWNKOkkOOOOOO0000000OOOkkkkOOKNW N0kxxONW             ")
		console.log("           WKxxkKW NKOkkkOKNW                 WNKOOkkOKW WKkxxKW           ")
		console.log("         W0xdON W0kxxkXW                           WKxdxkKW N0xx0W         ")
		console.log("       WKxx0W XOxddxxxkKW                         N0xxxdodxON WKxd0W       ")
		console.log("      Xxd0W XkdddxkKWN0xxKW                     N0xkKWWKkddddON W0dxX      ")
		console.log("    W0dxN NOdddxOX WNW N0xxKW    WWNNNNNNW    NOxkXWWXXW XOdodd0W Nkd0W    ")
		console.log("   WOo0W KxdxdkN WOcl:kN N0xxOOOOOOOOOOOOOOOOkxkX WXkxxx0W XkddoxX W0dOW   ")
		console.log("  WkoK W0oddxKWW0c/.   .;kN W0O0XNWW      WNX00XWWKkx0NWKxxKWWKxdodK  KoxN ")
		console.log(" WkoK WOoxdkN Nd/.       ,OW     WK0SOLK0OXW     WklkN   W0dkN NxoodK  KokW")
		console.log(" Oo0  0oxdkW Xl/.      .oKWWX0N  NOJavierkXW WKOXN0oxN     NxxX NkoddK  0oO")
		console.log("XdkW KdxdxW Xc       :0WW0l..,xN  N0OO0XW W0xxkxxkKW       NxdX NxoddX WkoX")
		console.log("xdX NxdddX No      .lX Nd.     ,xX  WW  W0xxKW WNW          NxxN XddokW Ndx")
		console.log("ok  0dxdO WO:.     lN Xc         /dXW NOccOW                 XdOW OoddK  Oo")
		console.log("lK WxdddX XdxKd/  ;K No            /cl;. .:ON                 kdX NddokW Ko")
		console.log("oN NdddxW 0o0  Xd;xW O/                    .:ON               Ko0 WkoodN No")
		console.log("oW Xdddk  OdK   KdO  x.         ,ccllcllc,   .:ON             XdO  OoodN Wo")
		console.log("oW Xdddk  OdX   Kd0  x.        .dW  WWWWWd.    .:ON           XdO  OdodX Wo")
		console.log("oN XdddxW 0oK   Xdk  0;/.      .xW Xo;;;;.       .:OW         Ko0 WkdodN No")
		console.log("oK WxdxdN XdkW  WkdX Nxokl.    .xW K;              .:OW       kdX NxdokW Xl")
		console.log("oO  Odxd0 WkdX   XdkW XdxXKo.  .dW WKOOOl.           .:OW    XdkW 0ddo0  Ol")
		console.log("xdN NdxxdX NxxW   KdkN Nkd0WKd/.x  WNXXKo.             .:OW NxxN NxdoxW Ndd")
		console.log("KoOW 0oxdxW KdkW   XxxX W0xx0NKlxW Xc/....      ..        .:kxdX WkdddK  Oo")
		console.log("WkoK WkdkdkW KdkN   NOdON WKOkxlkW K;       .;d0Oc.        .oX WOddoOW KokW")
		console.log(" WkdX WkdkdxN 0lkW    XOxkKN WX0X  Nd:::cldOXW W0l.        :X NkdxoOW XdxN ")
		console.log("  NxdX WkdkxdxxkX       N0kkkOKNW    WW   WNKkl;.          .ckddxdOW XdxN  ")
		console.log("   NkdKWW0dxkON            WK0OdkN NOdxOOkl/.                ,dddKW KdxN   ")
		console.log("    WOdON Xkx0W                kdX Ko:xXNNKo.              .cddkN WOoOW    ")
		console.log("      KxdKWWKxx0W              kdX KdcO    WKd/          .codxKWWKxxKW     ")
		console.log("       WOdxXWWKkxON            klk0klcO       Xx,     .;ldxkKWWXkdOW       ")
		console.log("         NOdxKWWXOkk0XW        XOOOOOKN         Nx;/:loxkOX WKkdON         ")
		console.log("           NOxxOXWWKOkkO0XN                    WNKkxxkOXW NOxxON           ")
		console.log("             WKkxxOXWWNKOkkkOOO0KKXXXXXXXKK0OOOOkkOKN WXOxxkOW             ")
		console.log("                WKkkkkOKNWWNX0OOOOOOOOOOOOOO0KXNWWNKOkxxkKW                ")
		console.log("                    NKOkkkkkO0KXNWWWWWWWWWNXXK0OkkkkOKNW                   ")
		console.log("                        WX0xdllllooodddooolllodxOXW                        ")
		console.log("                             llllooodddooolloo                             ")

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

	var spotify = new Spotify(keys.spotify);

	if (newSong!=="") {

		song= newSong;
		console.log(song)
	}

	else if (userInquiry[3] === "" || (userInquiry[3] === undefined)) {

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


//do-what-it-says
function doWhatItSays(callBack){

	fs.readFile("random.txt", "utf8", function(error, data) {

	  if (error) {
	    return console.log(error);
	  }
	  var dataArr = data.split(",");
	  var newSong = dataArr[1]
	  callBack(newSong)
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