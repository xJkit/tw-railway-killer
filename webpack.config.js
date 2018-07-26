const path = require('path');
const Dotenv = require('dotenv-webpack');

const ENV = process.env.ENV || 'development';

module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  mode: ENV,
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      safe: true,
      systemvars: true
    })
  ]
};
