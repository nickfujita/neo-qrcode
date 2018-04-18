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

function generateDataUrl(nep9Data: NEP9, type: 'png'|'jpeg'|'webp' = 'png', color?: ColorOptions): Promise<string> {
  const uri = nep9.generateUri(nep9Data);

  const options = {
    type: `image/${type}`,
    color,
    errorCorrectionLevel: 'H',
  };

  return new Promise((resolve, reject) => {
    QRCode.toDataURL(uri, options, (err, url) => {
      return err ? reject(err) : resolve(url);
    });
  });
}

function attachImg(nep9Data: NEP9, imgEle, type?, theme?: 'neo') {
  generateDataUrl(nep9Data, type, theme === 'neo' && neo_colors)
  .then(uri => {
    imgEle.src = uri;
  });
}

function generateSvg(nep9Data: NEP9, color?: ColorOptions) {
  const uri = nep9.generateUri(nep9Data);

  const options = {
    type: 'svg',
    color,
    errorCorrectionLevel: 'H',
  };

  return new Promise((resolve, reject) => {
    QRCode.toString(uri, options, (err, url) => {
      return err ? reject(err) : resolve(url);
    });
  });
}

function generateCanvas(nep9Data: NEP9, color?: ColorOptions) {
  const uri = nep9.generateUri(nep9Data);

  const options = {
    color,
    errorCorrectionLevel: 'H',
  };

  return new Promise((resolve, reject) => {
    QRCode.toCanvas(uri, options, (err, canvas) => {
      return err ? reject(err) : resolve(canvas);
    });
  });
}

function attach(divEle, nep9Data: NEP9, type: 'png'|'jpeg'|'webp'|'svg'|'canvas'|any = 'svg', theme?: 'neo') {

  if (/png|jpeg|webp/.test(type)) {
    const imgEle = document.createElement('img');
    generateDataUrl(nep9Data, type, theme === 'neo' && neo_colors)
    .then(uri => {
      imgEle.src = uri;
      divEle.innerHTML = '';
      divEle.append(imgEle);
    });
  } else if (/svg/.test(type)) {
    generateSvg(nep9Data, theme === 'neo' && neo_colors)
    .then(svg => {
      divEle.innerHTML = svg;
    });
  } else if (/canvas/.test(type)) {
    generateCanvas(nep9Data, theme === 'neo' && neo_colors)
    .then(canvas => {
      divEle.innerHTML = '';
      divEle.append(canvas);
    });
  }

}

function stream(stream, nep9Data: NEP9, color?: ColorOptions) {
  const uri = nep9.generateUri(nep9Data);

  const options = {
    color,
    errorCorrectionLevel: 'H',
  };

  QRCode.toFileStream(stream, uri, options);
}

export default {
  ...nep9,
  generateDataUrl,
  generateSvg,
  attachImg,
  attach,
  stream,
  Asset,
};
