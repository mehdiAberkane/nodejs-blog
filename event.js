const EventEmitter = require('events');

let myEvent = new EventEmitter();

exports.myEvent.on('hello', function (name){
    console.log('hello '. name);
});

//myEvent.emit('hello', 'Asaku');
