var fs = require('fs');



//with no stream
fs.readFile('monfichier.txt', function(err, data){
	fs.writeFile('copie_monfichier.txt', data, function(){
		console.log('ok');
	})
});


//with stream

let read = fs.createReadStream('music.m4a');

read.on('data', function(chunk){
	console.log(chunk.length);
});

read.on('end', function(){
	console.log('end');
});