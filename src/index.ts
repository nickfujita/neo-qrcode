import nep9 from './nep9';
import { NEP9 } from './types';
import QRCode from 'qrcode';

function generateDataUrl(nep9: NEP9, type: 'png'|'jpeg'|'webp' = 'png') {
  const uri = nep9.generateUri(nep9);

  const options = {
    errorCorrectionLevel: 'H',
    type: `image/${type}`,
  };

  return new Promise((resolve, reject) => {
    QRCode.toDataURL(uri, options, (err, url) => {
      return err ? reject(err) : resolve(url);
    });
  });
}

export default {
  ...nep9,
};
