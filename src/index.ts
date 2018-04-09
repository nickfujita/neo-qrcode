import nep9 from './nep9';
import { NEP9, Asset } from './nep9/types';
import QRCode from 'qrcode';

interface ColorOptions {
  dark: string;
  light: string;
}

const neo_colors = {
  dark: '#8ff73bff', // dots
  light: '#000000ff', // space
};

function generateDataUrl(nep9Data: NEP9, type: 'png'|'jpeg'|'webp' = 'png', color?: ColorOptions) {
  const uri = nep9.generateUri(nep9Data);

  const options = {
    type: `image/${type}`,
    color,
  };

  return new Promise((resolve, reject) => {
    QRCode.toDataURL(uri, options, (err, url) => {
      return err ? reject(err) : resolve(url);
    });
  });
}

function qrImg(nep9Data: NEP9, imgEle, theme: undefined|'neo') {
  generateDataUrl(nep9Data, null, theme === 'neo' && neo_colors)
  .then(uri => {
    imgEle.src = uri;
  });
}

function generateString(nep9Data: NEP9, type: 'svg'|'utf8' = 'svg', color?: ColorOptions) {
  const uri = nep9.generateUri(nep9Data);

  const options = {
    type,
    color,
  };

  return new Promise((resolve, reject) => {
    QRCode.toString(uri, options, (err, url) => {
      return err ? reject(err) : resolve(url);
    });
  });
}

export default {
  ...nep9,
  generateDataUrl,
  generateString,
  qrImg,
  Asset,
};
