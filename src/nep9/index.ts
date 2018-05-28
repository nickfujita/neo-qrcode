import { NEP9, NEP9Key } from './types';

function generateUri(nep9Data: NEP9): string {

  const parameters = Object.keys(nep9Data).reduce((accum, key) => {
    const value = encodeURIComponent(nep9Data[key]);
    NEP9Key[key] && accum.push(`${key}=${value}`);
    return accum;
  }, []);

  let output = `neo:${nep9Data.address}`;

  if (parameters.length) {
    output += `?${parameters.join('&')}`;
  }

  return output;
}

function parseUri(uri: string): NEP9 {
  if (!uri.startsWith('neo:')) {
    throw 'Not a valid NEP9 uri';
  }

  uri = uri.replace(/^(neo\:)/, '');

  const uriParts = uri.split('?');
  const nep9: NEP9 = {
    address: uriParts[0],
  };

  if (uriParts.length === 1) {
    return nep9;
  }

  const attributes = uriParts[1];
  const attributesList = attributes.split('&');

  attributesList.forEach(attribute => {
    const attributeParts = attribute.split('=');

    if (attributeParts.length < 2) {
      return;
    }

    const key = attributeParts[0];
    const value = attributeParts[1];

    if (NEP9Key[key]) {
      nep9[key] = value;
    }
  });

  return nep9;
}

export default {
  generateUri,
  parseUri,
};
