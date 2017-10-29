var compile = require('string-template/compile');
var template = compile('{0}');
const mmdbReader = require('mmdb-reader');
const reader = new mmdbReader('data/GeoLite2-Country_20171003/GeoLite2-Country.mmdb');

var russianCountries = ['RU', 'BY', 'KZ', 'KG'];
var spanishCountries = ['MX', 'CL', 'ES', 'AR', 'CR', 'CO', 'BO', 'CL', 'CU', 'DO', 'EC', 'GT', 'HN', 'NI', 'PA', 'VE'];
var chineseCountries = ['CN', 'TW', 'HK', 'MO'];

module.exports = {
	english: function(){return template("Hello, and welcome to my homepage")},
	spanish: function(){return template("Hola, y bienvenidos a mi pagina de web");},
	russian: function(){return template("Привет, добро пожаловать на мою домашнюю страницу");},
	chinese: function(){return template("您好，欢迎来到我的网站");},

	getBanner: function(req){ 
		var reqAddr = req.connection.remoteAddress;
		var cc = reader.lookup('66.90.167.133').registered_country.iso_code;
		var lang = getLanguage(cc);
		return this[lang]; 
	},
};

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

