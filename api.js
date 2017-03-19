//import lib
const http = require('http');
const util = require('util');
const fs = require('fs');
const url = require('url');
const myHello = require('./hello');

//config global
const hostname = '127.0.0.1';
const port = 3000;

myHello.hello();

function getErrorPage()
{
    var data = fs.readFileSync('html/404.html');

    return data;
}

const server = http.createServer((req, res) => {
    let pathName = req.url;

    fs.readFile('html/'+pathName.substring(1)+'.html', (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(getErrorPage());
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
