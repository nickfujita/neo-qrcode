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
<script src="neoqr.min.js"></script>
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
    <img id="qrcode"></img>

    <div id="container"></div>
  </body>
```

JS / TS
```
const options = {
  address: 'AR8rRBxgWw5siKsp1dUmfTLy6QQTjcqoqB',
  asset: 'NEO', // or 'GAS' or 'ceab719b8baa2310f232ee0d277c061704541cfb'
  amount: 1
};

const width = 250; // px

const qrCode = new NeoQR(options, 250);



// set image src from data url

const imgEl = document.getElementById('qrcode');
qrCode.toDataURL()
.then(imgData => imgEl.src = imgData);



// Attaching to a div element

const imgEl = document.getElementById('qrcode');
qrCode.attach(imgEl);
```
