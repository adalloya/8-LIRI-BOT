require("dotenv").config();

var spotify = require('spotify');
var fs = require('fs');
var inputCommand = process.argv[2];
var commandParam = process.argv[3];
var defaultSong = "I WANT IT THAT WAY ";


function processCommands(command, commandParam){


	switch(command){

	case 'spotify-this-song':
		if(commandParam === undefined){
			commandParam = defaultSong;
		}     
		spotifyThis(commandParam); break;

	case 'do-what-it-says':
		doWhatItSays(); break;
	default: 
		console.log("Invalid command. Please type any of the following commnds: spotify-this-song or movie-this");
}


}

function spotifyThis(song){

	if(song === ""){
		song = "My way";
	}

	spotify.search({ type: 'track', query: song}, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }

    var song = data.tracks.items[0];
    console.log("Artists");
    for(i=0; i<song.artists.length; i++){
    	console.log(song.artists[i].name);
    }

    console.log("Song");
    console.log(song.name);

	console.log("Preview");
    console.log(song.preview_url);

	console.log("Album");
    console.log(song.album.name);

	});

}

function doWhatItSays(){
	fs.readFile('random.txt', 'utf8', function(err, data){

		if (err){ 
			return console.log(err);
		}

		var dataArr = data.split(',');

		processCommands(dataArr[0], dataArr[1]);
	});
}

processCommands(inputCommand, commandParam);