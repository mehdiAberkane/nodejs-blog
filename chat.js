const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000);

//config express
app.use(express.static('public'));

app.get('/', function(req, res){
  res.end('Chat Dev10');
});

io.on('connection', function(socket){
  io.emit('server', 'Connect On');

  socket.on('client', function(from, msg){
    console.log('new message from: ', from, 'saying ', msg);
    io.emit('server', {
      from: from,
      msg: msg,
      date: new Date()
    });
  });
});
