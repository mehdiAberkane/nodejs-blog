//import lib
const http = require('http');
const util = require('util');
const fs = require('fs');
const url = require('url');

//config global
const hostname = '127.0.0.1';
const port = 3000;

function getErrorPage()
{
    var data = fs.readFileSync('404.html');

    return data;
}

const server = http.createServer((req, res) => {
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(getErrorPage());
        } else {
            let query = url.parse(req.url, true).query;
            console.log(query.name);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
