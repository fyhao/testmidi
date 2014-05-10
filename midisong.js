var Midi = require('./lib/jsmidgen.js');

var file = new Midi.File();

var table = function(i) {
        var _table = {
                1 : 'c', 2 : 'd', 3 : 'e', 4 : 'f', 5 : 'g', 6 : 'a', 7 : 'b'
        };
        var level = 3;
        while(i > 7) {
                i -= 7;
                level++;
        }
        return _table[i] + level;
}

var addMusic = function(channel, instrument, arr) {
        
        var track = new Midi.Track();
        file.addTrack(track);
        if(instrument != null) {
                track.setInstrument(channel, instrument);
        }
        
        for(var i = 0; i < arr.length; i++) {
                var time = 128;
                var num = arr[i];
                var offset = num % 1;
                if(offset > 0) {
                        num -= offset;
                        time = Math.round(offset * 20) * 32;
                        //console.log(arr[i] + "," + time + " / " + offset);
                }
                var pitch = table(num);
                track.addNote(channel, pitch, time);
        }
}

var songs = {};
songs.song1 = function() {
	file = new Midi.File();
	// logic
	var arr = [];
	arr = arr.concat([8.4,8,8,9,9,10,5,6.8,7.4,7,7,8,8,9,6,5.8]);
	arr = arr.concat([8.4,8,8,9,9,10,5,6.8,7.4,7,7,8,8,9,8,8.8]);
	arr = arr.concat([8.4,8,8,9,9,10,5,6.8,7.4,7,7,8,8,9,6,5.8]);
	arr = arr.concat([8.4,8,8,9,9,10,5,6.8,7.4,7,7,8,8,9,8,8.8]);
	arr = arr.concat([8.4,15.4,14,13,12,11,10,10,11,9,9.8]);
	arr = arr.concat([8.4,15.4,14,13,12,11,10,10,11,10,9.8]);
	arr = arr.concat([9.1,10.1,11,10.1,11.1,12,8,9.4]);
	arr = arr.concat([5,5,9,9,8,8.4,8,4]);
	arr = arr.concat([8.4,15.4,14,13,12,11,10,10,11,9,9.8]);
	arr = arr.concat([8.4,15.4,14,13,12,11,10,10,11,10,9.8]);
	arr = arr.concat([9.1,10.1,11,10.1,11.1,12,8,9.4]);
	arr = arr.concat([5,5,9,9,8,8.4,8,4]);
	
	arr = arr.concat([8.4,8,8,9,9,10,5,6.8,7.4,7,7,8,8,9,6,5.8]);
	arr = arr.concat([8.4,8,8,9,9,10,5,6.8,7.4,7,7,8,8,9,8,8.8]);
	arr = arr.concat([8.4,15.4,14,13,12,11,10,10,11,9,9.8]);
	arr = arr.concat([8.4,15.4,14,13,12,11,10,10,11,10,9.8]);
	arr = arr.concat([9.1,10.1,11,10.1,11.1,12,8,9.4]);
	arr = arr.concat([5,5,9,9,8,8.4,8,4]);
	
	var arr1 = [];
	for(var i = 0; i < arr.length; i++) {
	        arr1.push(arr[i] + 7);
	}
	addMusic(1, 0x01, arr1);
	var arr2 = [];
	var ranges = [-3,1,-1,-2];
	var rangeIndex = 0;
	var getSound = function() {
	        if(rangeIndex >= ranges.length) {
	                rangeIndex = 0;
	        }
	        return ranges[rangeIndex++];
	}
	for(var i = 0; i < arr.length; i++) {
	        console.log(arr[i] % 1)
	        if(arr[i] % 1 >= 0.7) {
	                arr2.push(Math.floor(arr[i]) + getSound() + .2)
	                arr2.push(Math.floor(arr[i]) + getSound() + .2)
	                arr2.push(Math.floor(arr[i]) + getSound() + .2)
	                arr2.push(Math.floor(arr[i]) + getSound() + .2)
	        }
	        else if(arr[i] % 1 >= 0.4) {
	                arr2.push(Math.floor(arr[i]) + getSound() + .2)
	                arr2.push(Math.floor(arr[i]) + getSound() + .2)
	        }
	        else if(arr[i] % 1 <= 0.1 && arr[i] % 1 > 0) {
	                arr2.push(Math.floor(arr[i]) + getSound() + .1);
	        }
	        else {
	                arr2.push(5 + getSound())
	        }
	        console.log('arr:'+ i + ":" + arr[i] + " : " + arr2[i]);
	}
	arr2.push(5 + getSound() + .4)
	arr2.push(5 + getSound() + .4)
	arr2.push(5 + getSound() + .8)
	arr2.push(3 + getSound() + .8)
	addMusic(2, 0x02, arr2);
	addMusic(3, 0x03, arr);
	
	return file.toBytes();
};

songs.song2 = function() {
	file = new Midi.File();
	// logic
	var arr = [];
	arr = arr.concat([12.1,13.1,8.1,12.1,12.1,13.1,13.2]);
	arr = arr.concat([12.1,13.1,8.1,13.1,13.1,12,7.1]);
	arr = arr.concat([11.1,12.1,7.1,11.1,11.1,12,7.1]);
	arr = arr.concat([10.4,9.4]);
	arr = arr.concat([12.1,13.1,8.1,12.1,12.1,13.1,13.2]);
	arr = arr.concat([13.1,12.1,8.1,13.1,13.1,12,7.1]);
	arr = arr.concat([11.1,12.1,7.1,11.1,11.1,12,7.1]);
	
	var arr1 = [];
	for(var i = 0; i < arr.length; i++) {
	        arr1.push(arr[i] + 7);
	}
	addMusic(1, 0x01, arr1);
	
	
	return file.toBytes();
};

module.exports = {
	getMidiSong : function(song) {
		if(typeof(songs[song]) != 'undefined') {
			return songs[song]();
		}
		return null;
	}
};
