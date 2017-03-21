const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const database = require('./database');
const app = express();

app.listen(3000);
const server = require('http').createServer(app);
const socketIo = require('socket.io').listen(server);

database.mongoose.connect('mongodb://localhost/blog');

//middleware compression/favicon/urlencode/bodyParser
app.use(compression());
app.use(favicon(path.join(__dirname, 'public', 'img/fav.ico'), 0));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.set('trust proxy', 1); // trust first proxy
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

//defined jade as view engine by default
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req, res) {
        var sess = req.session;
        if (sess.login) {
            console.log(sess.login);
        } else {
            sess.login = 'admiaaaan';
        }
        res.setHeader('Content-Type', 'text/html');
        database.article.find(null, function (err, articles) {
            if (err) { throw err; }

            res.render('index', {articles: articles });
        });
    })
    .post('/login', function(req, res) {
        var sess = req.session;
        if (req.body.login == 'admin' && req.body.password == 'azerty') {
            sess.pseudo = 'admin';
            console.log(sess.pseudo);
            res.setHeader('Content-Type', 'text/html');
            res.end('Page contact');
        } else {

        }
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
    .get('/chat', function(req, res) {
        res.setHeader('Content-Type', 'text/html');


        res.render('chat', { });
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

socketIo.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });
});

server.listen(8080);

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Lost !');
});
