// first project

const express = require('express');
const app = express();
const fs = require('file-system');
const mmdbReader = require('mmdb-reader');
const reader = new mmdbReader('data/GeoLite2-Country_20171003/GeoLite2-Country.mmdb');

app.use(express.static(__dirname + '/'));

let banners = require('./banners');
let lang = 'english';

app.get('/', function(req, resp){
	//resp.send(lines);
	//console.log(req.connection.remoteAddress);
	
	//let cc = reader.lookup(req.connection.remoteAddress);
	let cc = reader.lookup('66.90.167.133');
	console.log('here with cc: '+ cc.registered_country.iso_code);

	let text = '<!doctype html>';
	text += banners[lang]();

	fs.readFile(__dirname + '/body.html', function(err, data){
		if(!err){
			console.log('trying to write body');
			//resp.write(data);
			text = text + data;
		} else {
			console.log('error writing body.html');
		}
		
		console.log('text:: '+ text);
		resp.send(text);
	});

});

app.get('/banners',function(req, resp){
	console.log('here ----- with lang ', lang);
	console.log(banners[lang]());
	console.log(banners.spanish('derp'));
	resp.end();
});

app.get('/reflect/:text', function(req,resp){
	resp.send(req['params']['text']);
});

app.listen(3000, function(error){
	if(error == true){
		console.lgo("An error occured on startup.");
	} else {
		console.log("Listening on port 3000");
	}
});
