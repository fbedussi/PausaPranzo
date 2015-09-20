var fs = require('fs'),
	moment = require('moment'),
	config = require('../conf/config');

var todayFormatted = moment().format(config.dateFormat);
var filename = todayFormatted + ".json";
var template = {
	"data": todayFormatted,
	"primi": [ { "nome": "pasta alla norma", "prezzo": 7.00 }, {"nome": "pasta al pesto", "prezzo": 6.00} ],
	"secondi": [ { "nome": "fettina ai ferri", "prezzo": 7.00 }, {"nome": "insalatona ", "prezzo": 8.00} ]

}
fs.writeFile(filename, JSON.stringify(template), function (err) {
  if (err) return console.log(err);
  console.log('Written '+filename);
});