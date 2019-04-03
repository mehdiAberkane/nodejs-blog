const scribble = require('scribbletune');
let chords = scribble.clip({
	notes: 'DM DM DM DM DM',
	pattern: 'x_x_x_--'.repeat(8),
	sizzle: true
}); 

scribble.midi(chords)
/*
scribble.transport.start();
clip.start();

*/