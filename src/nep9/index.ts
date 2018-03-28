import { NEP9, TransactionAttributes, TransactionAttributeKey, NEP9Key } from './types';

function generateUri(nep9: NEP9): string {
  let parameters = [];

  if (nep9.assetId) {
    parameters.push(`${NEP9Key.assetId}=${nep9.assetId}`);
  }

  if (nep9.amount) {
    parameters.push(`${NEP9Key.amount}=${nep9.amount}`);
  }

  if (nep9.transactionAttributes) {
    parameters = Object.keys(nep9.transactionAttributes).reduce((accum, key) => {
      const transactionAttributeKey = TransactionAttributeKey[key];
      const value = nep9.transactionAttributes[key];

      transactionAttributeKey && accum.push(`${transactionAttributeKey}=${value}`);

      return accum;
    }, parameters);
  }

  let output = `neo:${nep9.address}`;

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
  const transactionAttributes: TransactionAttributes = {};

  attributesList.forEach(attribute => {
    const attributeParts = attribute.split('=');

    if (attributeParts.length < 2) {
      return;
    }

    const key = attributeParts[0];
    const value = attributeParts[1];

    if (key === 'assetId' || key === 'amount') {
      nep9[key] = value;
    } else if (TransactionAttributeKey[key]) {
      transactionAttributes[key] = value;
    }
  });

  if (Object.keys(transactionAttributes).length) {
    nep9.transactionAttributes = transactionAttributes;
  }

  return nep9;
}

export default {
  generateUri,
  parseUri,
};
