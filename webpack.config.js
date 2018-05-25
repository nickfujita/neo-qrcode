'use strict'

const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  const DISTRIBUTION = env && env.DISTRIBUTION === 'true';

  return {
    resolve: {
      extensions: ['.ts', '.js'],
    },
    entry: ['./src/index'],
    output: {
      path: path.join(__dirname, 'build'),
      filename: DISTRIBUTION ? 'neoqr.min.js' : 'bundle.js',
      libraryTarget: "umd",
      library: 'NeoQR',
      globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    devtool: !DISTRIBUTION && 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: 'pre',
          loader: "tslint-loader",
          exclude: [/node_modules/],
        },
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          use: 'ts-loader',
          include: path.join(__dirname, 'src'),
        },
      ],
    },
  };
};
