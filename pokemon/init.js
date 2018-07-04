const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const url = "https://pokemondb.net/pokedex/all";

request(url, { json: true }, (err, res, body) => {
  	if (err) { return console.log(err); }

	const dom = new JSDOM(body);
	let pokemons = dom.window.document.querySelector("table").textContent;
	for (var i = 0; i <= pokemons.length - 1; i++) {
		console.log(pokemons[i])
	}
});
