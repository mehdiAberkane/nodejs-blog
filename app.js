const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const database = require('./database');
const app = express();
app.listen(3000);

database.mongoose.connect('mongodb://localhost/blog');

//middleware compression/favicon/urlencode/bodyParser
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
        res.setHeader('Content-Type', 'text/html');
        database.article.find(null, function (err, articles) {
            if (err) { throw err; }

            res.render('index', {articles: articles });
        });
    })
    .get('/contact', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('Page contact');
    })
    .get('/article/:article_slug/', function(req, res) {
        res.setHeader('Content-Type', 'text/html');

        database.article.find({slug: req.params.article_slug}, function (err, article) {
            if (err) { throw err; }

            res.render('article', {article: article[0] });
        });
    })
    .post('/', function(req, res) {
        if (req.body.title.length == 0 || req.body.content.length == 0) {
            //gestion error
        } else {
            var title = req.body.title;
            var content = req.body.content;
            database.createArticle(title, content)
        }

        res.redirect('/');
    })
;

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Lost !');
});
