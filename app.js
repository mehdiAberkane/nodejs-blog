var express = require('express');
var app = express();
var compression = require('compression');
app.listen(3000);

//middleware compression ex: gzip
app.use(compression());

//defined jade as view engine by default
app.set('view engine', 'jade');
app.set('views', './views');

app.get('/', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('Vous êtes à l\'accueil');
    })
    .get('/contact', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('Page contact');
    })
    .get('/articles/:article_name/', function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.render('index', { title: req.params.article_name, message: 'Mon super article!'});
    })
;

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Lost !');
});
