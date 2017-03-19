const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.listen(3000);

mongoose.connect('mongodb://localhost/blog');
//var Cat = mongoose.model('Cat', { name: String });
//
//var kitty = new Cat({ name: 'Zildjian' });
//kitty.save(function (err) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log('meow');
//    }
//})

//middleware compression/favicon
app.use(compression());
app.use(favicon(path.join(__dirname, 'public', 'img/fav.ico'), 0));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//defined jade as view engine by default
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req, res) {
        var articles = [
            {"title": "mon titre", "slug": "mon-titre", "content": "mon article"},
            {"title": "mon titre 2", "slug": "mon-titsdsdsdre", "content": "les chats roux"},
            {"title": "mon titre 3", "slug": "mon-titsdsdre", "content": "vive les chiens"},
            {"title": "mon titre 4", "slug": "mon-titsdsddre", "content": "mon qsdqsdqsqdd"},
            {"title": "mon titre 5", "slug": "mon-titrddsdsde", "content": "mon artqsdqsdicle"},
            {"title": "mon titre 6", "slug": "mon-titsdssssre", "content": "mon qsdqsd"}
        ];

        res.setHeader('Content-Type', 'text/html');
        res.render('index', {articles: articles });
    })
    .get('/contact', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('Page contact');
    })
    .get('/article/:article_slug/', function(req, res) {
        var article = [{"title": "mon titre", "slug": "mon-titre", "content": "mon article"}];

        res.setHeader('Content-Type', 'text/html');
        res.render('article', {article: article });
    })
    .post('/', function(req, res) {
        if (req.body.title.length == 0 || req.body.content.length == 0) {
            res.redirect('/');
        } else {
            var title = req.body.title;
            var content = req.body.content;


        }
    })
;

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Lost !');
});
