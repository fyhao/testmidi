//http://www.midikits.net23.net/midi_analyser/midi_note_numbers_for_octaves.htm

var noteTable = {};
(function(_table) {
	var notes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b' ];
var octave = [-1,0,1,2,3,4,5,6,7,8,9];
var table = {};

var _index = 0;
for(var i = 0; i < octave.length; i++) {
	for(var j = 0; j < notes.length; j++) {
		var noteOctave = notes[j] + octave[i];
		_table[noteOctave] = _index;
		_index++;
		if(_index > 127) {
			break;
		}
	}
}
})(noteTable);