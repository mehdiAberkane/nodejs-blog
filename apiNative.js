//import lib
const http = require('http');
const util = require('util');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

function getErrorPage()
{
    var data = fs.readFileSync('404.html');

    return data;
}

exports.server = http.createServer((req, res) => {

    let pathName = req.url;

    fs.readFile(pathName.substring(1)+'.html', (err, data) => {
        if (req.method == 'POST') {
            var body = '';

            req.on('data', function (data) {
                body += data;
                if (body.length > 1e6)
                    req.connection.destroy();
            });
            req.on('end', function () {
                var post = qs.parse(body);
                console.log(post);
            });

            res.writeHead(302, {
                'Location': 'index'
            });
            res.end();
        } else {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end(getErrorPage());
            } else {
                //let query = url.parse(req.url, true).query;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        }
    })
});
