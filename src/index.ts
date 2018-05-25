import nep9 from './nep9';
import { NEP9 } from './nep9/types';
import QRCode from 'qrcode';
import axios from 'axios';

class NeoQR {

  private creationPromise;

  constructor(nep9Data: NEP9|string, width = 200, canvasOverride?, axiosOverride?) {
    let canvas;
    const uri = typeof nep9Data === 'string' ? nep9Data : nep9.generateUri(nep9Data as NEP9);

    const options = {
      errorCorrectionLevel: 'H',
      width,
    };

    this.creationPromise = new Promise((resolve, reject) => {
      if (canvasOverride) {
        QRCode.toCanvas(canvasOverride, uri, options, (err, canvas) => {
          return err ? reject(err) : resolve(canvas);
        });
      } else {
        QRCode.toCanvas(uri, options, (err, canvas) => {
          return err ? reject(err) : resolve(canvas);
        });
      }
    })

    .then(c => {
      canvas = c;
      const realAxios = axiosOverride || axios;
      return realAxios.get('./assets/neo.svg')
      .then(response => {
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(response.data)}`;
      });
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
          resolve(dt);
        };
        img.src = logoSrc;
      });
    });
  }

  attach(divEle): Promise<any> {
    divEle.innerHTML = '';
    const img = new Image();
    return this.creationPromise
    .then(src => {
      img.src = src;
      divEle.append(img);
    });
  }

  toDataURL(): Promise<any> {
    return this.creationPromise;
  }
}

export default NeoQR;
