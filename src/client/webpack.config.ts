const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.ts',
  devtool: 'inline-source-map',
  mode: 'production',
  node: { fs: "empty" },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/]
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.spec.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../../dist/client')
  },
  plugins: [
    new HTMLPlugin({
      template: './index.html',
      minify: true,
      hash: true,
      cache: true,
    })
  ]
};

