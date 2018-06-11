# NEO QR Code Generator
A QR code generator for receiving NEO/GAS/NEP5. Complies with the URI standard format detailed in the [NEP9 proposal](https://github.com/neo-project/proposals/pull/25).

![Imgur](https://i.imgur.com/ofagD21.png)

Can be configured to include:
- Address
- Asset
- Amount

...and all others detailed in NEP9

## Usage

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/neo-qrcode/badge)](https://www.jsdelivr.com/package/npm/neo-qrcode)
```
<script src="https://cdn.jsdelivr.net/npm/neo-qrcode/build/neoqr.min.js"></script>
```
```
window.NeoQR
```

Install via npm [![npm version](https://badge.fury.io/js/neo-qrcode.svg)](https://badge.fury.io/js/neo-qrcode)
```
npm i --save neo-qrcode
```

```
var NeoQR = require('neo-qrcode');

import NeoQR from 'neo-qrcode';
```

## Example
HTML
```
  <body>
    <canvas id="canvas-container"></canvas>

    <img id="img-container"></img>

    <img id="img-src-container"></img>
  </body>
```

JS
```
var options = {
  address: 'AR8rRBxgWw5siKsp1dUmfTLy6QQTjcqoqB',
  asset: 'NEO', // or 'GAS' or 'ceab719b8baa2310f232ee0d277c061704541cfb'
  amount: 1,
  description: 'Sunday morning breakfast'
};



// attach to canvas element

var canvasContainer = document.getElementById('canvas-container');
var canvasQrCode = new NeoQR({nep9Data: options, canvasEl: canvasContainer});



// attach to a img element

var imgContainer = document.getElementById('img-container');
var imgQrCode = new NeoQR({nep9Data: options, imgEl: imgContainer});



// set img src from data url

var imgSrcContainer = document.getElementById('img-src-container');
var qrCode = new NeoQR({nep9Data: options});
qrCode.toDataURL()
.then(imgData => imgSrcContainer.src = imgData);
```
