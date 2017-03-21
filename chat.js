const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.listen(3000);
const server = require('http').createServer(app);
const socketIo = require('socket.io').listen(server);

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
        res.render('chat', {});
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

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Lost !');
});
