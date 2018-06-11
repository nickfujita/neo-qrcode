import axios from 'axios';
import nep9 from './nep9';
import { NEP9 } from './nep9/types';
import QRCode from 'qrcode';
import nep5Tokens from './nep5';

export default class NeoQR {

  private _uri: string;
  private creationPromise;

  static parseUri(uri: string): NEP9 {
    return nep9.parseUri(uri);
  }

  constructor({nep9Data, width = 200, canvasEl, imgEl}: NeoQRData) {
    let canvas;
    this._uri = nep9.generateUri(nep9Data);

    const options = {
      errorCorrectionLevel: 'H',
      width,
    };

    // Create the qr code canvas
    this.creationPromise = new Promise((resolve, reject) => {
      QRCode.toCanvas(this._uri, options, (err, canvas) => {
        return err ? reject(err) : resolve(canvas);
      });
    })
    // save the canvas and fetch nep5 data if not already fetched
    .then(c => {
      canvas = c;
      const asset = nep9Data.asset && nep9Data.asset.toUpperCase();
      let assetSymbol = 'NEO';
      if (asset === 'NEO' || asset === 'GAS') {
        assetSymbol = asset;
      } else if (asset) {
        assetSymbol = nep5Tokens[nep9Data.asset];
      }

      return axios.get(`https://cdn.o3.network/img/nep5svgs/${assetSymbol}.svg`)
      .catch(e => axios.get(`https://cdn.o3.network/img/nep5svgs/NEO.svg`))
      .then(response => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(response.data)}`);
    })
    .then(logoSrc => {
      return new Promise((resolve, reject) => {
        const context = canvas.getContext('2d');
        context.roundRect = function (x, y, w, h, r) {
          if (w < 2 * r) {
            r = w / 2;
          }
          if (h < 2 * r) {
            r = h / 2;
          }
          this.beginPath();
          this.moveTo(x + r, y);
          this.arcTo(x + w, y, x + w, y + h, r);
          this.arcTo(x + w, y + h, x, y + h, r);
          this.arcTo(x, y + h, x, y, r);
          this.arcTo(x, y, x + w, y, r);
          this.closePath();
          return this;
        };
        const img = new Image();
        img.onload = function() {
          const scale = width / 200;
          context.roundRect(70 * scale, 70 * scale, 60 * scale, 60 * scale, 5 * scale);
          context.fillStyle = 'white';
          context.fill();
          context.drawImage(img, 80 * scale, 80 * scale, 40 * scale, 40 * scale);
          const dt = canvas.toDataURL('image/png');
          if (canvasEl) {
            canvasEl.width = canvas.width;
            canvasEl.height = canvas.height;
            const destCtx = canvasEl.getContext('2d');
            destCtx.drawImage(canvas, 0, 0);
          } else if (imgEl) {
            imgEl.src = dt;
          }
          resolve(dt);
        };
        img.src = logoSrc;
      });
    });
  }

  get uri(): string {
    return this._uri;
  }

  toDataURL(): Promise<any> {
    return this.creationPromise;
  }
}

interface NeoQRData {
  nep9Data: NEP9;
  width?: number;
  canvasEl?: HTMLCanvasElement;
  imgEl?: HTMLImageElement;
}
