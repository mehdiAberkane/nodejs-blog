const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.listen(3000);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

//defined jade as view engine by default
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req, res) {
        var articles = {"title": "mon titre", "slug": "mon-titre", "content": "mon article"};

        res.setHeader('Content-Type', 'text/html');
        res.render('index', { articles });
    })
    .get('/contact', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('Page contact');
    })
    .get('/articles/:article_name/', function(req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.render('index', { title: req.params.article_name, message: 'Mon super article!'});
    })
    .post('/', (req, res) => {
        var title = req.body.title;
        var content = req.body.content;
        if (title === undefined || content === undefined) {
            res.redirect('/');
        }
    })
;

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Lost !');
});
