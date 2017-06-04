const http = require('http');

//config global
const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
    if (req.method == 'POST') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ a: 1 }));
    }

    if (req.method == 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ a: 1 }));
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end('404');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
