const request = require('request');
const express = require('express');
const exphbs  = require('express-handlebars');
// const QRCode = require('qrcode');
const NeoQR = require('../build/bundle.js').default;
const PNG = require('pngjs').PNG;

const Canvas = require('canvas');
var axios = require('axios');

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM(`...`);
// const { document } = window;
// global.window = window;
// global.document = document;

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/png/:address', function (req, res) {
	const address = req.params.address;
	const properties = req.query;

	let uri = generateUri(address, properties);

	res.set('Content-Type', 'image/png');
	// QRCode.toFileStream(res, uri, options);

	const qrCode = new NeoQR(uri, 200, new Canvas(200, 200), axios);
	qrCode.toDataURL()
	.then(imageData => {
		const pngImage = new PNG().parse(imageData, function(error, data) {
			if (!error) {
				pngImage.pack().pipe(res);
			}
		});
	})
	.catch(err => {
		console.log('error', err);
	});
});

app.get('/:address', function (req, res) {
	const address = req.params.address;
	const asset = req.query.asset;

	res.render('home', {
		title: `To: ${address}`,
		url: 'https://www.google.com',
		imageUri: 'https://bd622a1e.ngrok.io/png/' + address + serializeQuery(req.query),
		description: `Asset: ${asset}\nAmount: ${req.query.amount}\nDescription: ${req.query.description}`,
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
