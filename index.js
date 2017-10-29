// first project

const express = require('express');
const app = express();
const mustache = require('mustache-express');
const fs = require('file-system');
const mmdbReader = require('mmdb-reader');
const reader = new mmdbReader('data/GeoLite2-Country_20171003/GeoLite2-Country.mmdb');

let banners = require('./banners');

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

var russianCountries = ['RU', 'BY', 'KZ', 'KG'];
var spanishCountries = ['MX', 'CL', 'ES', 'AR', 'CR', 'CO', 'BO', 'CL', 'CU', 'DO', 'EC', 'GT', 'HN', 'NI', 'PA', 'VE'];
var chineseCountries = ['CN', 'TW', 'HK', 'MO'];

app.get('/', function(req, res){
	var banner = banners.getBanner(req);
	res.render('index.html', {
		header: banner
	});
});

function getLanguage(cc){
	var defaultLang = 'english';
	if(russianCountries.includes(cc)){
		return 'russian';
	}
	if(chineseCountries.includes(cc)){
		return 'chinese';
	}
	if(spanishCountries.includes(cc)){
		return 'spanish';
	}
	return defaultLang;
}

app.get('/banners',function(req, res){
	console.log('here ----- with lang ', lang);
	console.log(banners[lang]());
	console.log(banners.spanish('derp'));
	res.end();
});

app.get('/reflect/:text', function(req,res){
	res.send(req['params']['text']);
});

app.listen(3000, function(error){
	if(error == true){
		console.lgo("An error occured on startup.");
	} else {
		console.log("Listening on port 3000");
	}

});
