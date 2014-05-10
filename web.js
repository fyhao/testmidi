
// express JS
var port = process.env.PORT || 8080;

// include ExpressJS framework
var express = require('express');
var fs = require('fs');
var util = require('./util.js');

// create a server from the express
var app = express.createServer();
app.use(express.bodyParser());
app.use(express.static(__dirname+'/static'));
app.listen(port);

var basepath = 'http://testmidi.herokuapp.com';
if(port != process.env.PORT) {
	basepath = 'http://localhost:' + port;
}

app.get('/', function(req, res) {
	var page = req.param('page', '');
	if(page == '') {
		page = 'index.html';
	}
	
	var templateValues = {
		basepath : basepath
	};
	if(page == 'test.html') {
		var song = req.param('song','song1');
		templateValues.song = song;		
	}
	
	var data = fs.readFileSync(page, 'utf8');
	data = util.replaceTemplateValue(data, templateValues);
	res.end(data);
});




var midisong = require('./midisong.js');
app.get('/midi', function(req, res) {
	res.writeHead(200,{
        "Content-Type": "audio/midi",
        'Access-Control-Allow-Origin':'*'
    });
	var buffer = midisong.getMidiSong(req.param('song'));
	var result = {data:'data:audio/midi;base64,'+new Buffer(buffer, 'binary').toString('base64'), maxChannel:3};
	res.end(JSON.stringify(result));
});
