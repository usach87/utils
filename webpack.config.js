const path = require("path");
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin({ extractComments: false })],
  },
  devtool: 'inline-source-map',
  mode: 'development',
};