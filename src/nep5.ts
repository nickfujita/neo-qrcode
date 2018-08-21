import axios from 'axios';

const nep5DataUrl = 'https://platform.o3.network/api/v1/neo/nep5';

let data;

export default function getNep5Data(): Promise<any> {
  return data ?
    Promise.resolve(data) :
    axios.get(nep5DataUrl)
    .then(res => res.data.result.data.nep5tokens)
    .then(data => data.reduce((accum, token) => {
      accum[token.tokenHash] = token;
      return accum;
    }, {}))
    .then(tokens => {
      data = tokens;
      return tokens;
    })
    .catch(() => {{}});
}
