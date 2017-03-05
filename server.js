const http = require('http');
var util = require("util");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(util.inspect(req));
});

console.log(typeof server);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});