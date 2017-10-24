'use strict'; 

const banners = require('../banners');
const assert = require('assert');

describe('Banners', function(){
	it('checks banner returned by language', function(){
		let lang = 'spanish';
		let result = banners[lang]();
		let expected = '<h1>Hola, y bienvenidos a mi pagina de web</h1>';
		assert.equal(result, expected);
	});
});
