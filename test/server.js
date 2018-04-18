var request = require('request');
var express = require('express');
// var neoQR = require('../build/bundle.js').default;
var QRCode = require('qrcode');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/png/:address', function (req, res) {
	const address = req.params.address;
	const properties = req.query;

	let uri = generateUri(address, properties);

	uri = uri.replace('neo:','https://bd622a1e.ngrok.io/');

	res.set('Content-Type', 'image/png');
	QRCode.toFileStream(res, uri, options);
});

app.get('/:address', function (req, res) {
	var address = req.params.address;
	var assetId = req.query.assetID;
	if (assetId === 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b') {
		assetId = 'NEO';
	} else if (assetId === '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7') {
		assetId = 'GAS';
	}

	res.render('home', {
		title: `To: ${address}`,
		url: 'https://www.google.com',
		imageUri: 'https://bd622a1e.ngrok.io/png/' + address + serializeQuery(req.query),
		description: `Asset: ${assetId}\nAmount: ${req.query.amount}\nDescription: ${req.query.description}`,
	})
});

app.listen(3000, function () {
	console.log('ImageOptimizer listening on port 3000!');
});


function generateUri(address, properties) {

  let output = `neo:${address}`;

	if (Object.keys(properties).length) {
  	output += serializeQuery(properties);
	}

  return output;
}

function serializeQuery(query) {

	const parameters = Object.keys(query).reduce((accum, key) => {
    const value = query[key];
    accum.push(`${key}=${value}`);
    return accum;
  }, []);

  let output = `?`;

  if (parameters.length) {
    output += `${parameters.join('&')}`;
	}

	return output;
}
