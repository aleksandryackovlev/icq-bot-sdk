'use strict';

const path = require('path');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  devtool: false,
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.mjs', '.yaml'],
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(yaml|js)$/i,
        rules: [
          {
            loader: require.resolve('openapi-client-sdk-loader'),
            options: {
              compiler: 'js',
              templateOptions: {
                validateRequest: true,
                validateResponse: false,
              },
              skipInvalid: true,
              style: {
                singleQuote: true,
                trailingComma: 'es5',
                printWidth: 100,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'node-fetch',
    }),
  ],
};
