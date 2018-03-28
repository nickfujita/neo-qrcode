'use strict'

const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = (env) => {
  const DISTRIBUTION = env && env.DISTRIBUTION === 'true';

  let plugins = [
    // new HtmlWebpackPlugin({
    //   inlineSource: '.(js)$',
    //   template: 'src/index.html'
    // }),
    // new HtmlWebpackInlineSourcePlugin(),
  ];

  return {
    resolve: {
      extensions: ['.ts'],
    },
    entry: ['./src/index'],
    output: {
      path: path.join(__dirname, DISTRIBUTION ? 'docs' : 'build'),
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      port: 9000,
      compress: false,
      https: false,
      open: true,
      historyApiFallback: true
    },
    devtool: 'inline-source-map',
    plugins: plugins,
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
