var compile = require('string-template/compile');
var template = compile('<h1>{0}</h1>');

module.exports = {
	english: function(){return template("Hello, and welcome to my homepage"); console.log('here');},
	spanish: function(){return template("Hola, y bienvenidos a mi pagina de web");}
};

