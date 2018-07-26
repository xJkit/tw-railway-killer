const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

const ENV = process.env.ENV || 'development';

module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  target: 'node-webkit',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    exprContextCritical: true,
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        type: 'javascript/auto',
        test: /.(json|html)/,
        use: 'file-loader'
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
  ],
  externals: [nodeExternals()]
};
