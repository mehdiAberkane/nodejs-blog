//const https = require('https');
const request = require('sync-request');

//https.get('https://encrypted.google.com/', (res) => {
//    console.log('statusCode:', res.statusCode);
//});
//console.log('hihou');

var req = request('GET', 'https://encrypted.google.com/');
console.log(req.statusCode);
console.log('hihou2');
