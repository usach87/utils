const path = require('path');

const CopyPlugin = require("copy-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');

const distPath = path.resolve(process.cwd(), 'dist');

function webpackConfig(entry) {
  return {
    entry,
    output: {
      path: distPath,
      filename: '[name].js',
      library: '[name]',
      libraryTarget: 'umd',
      publicPath: '../src',
      umdNamedDefine: true,
      environment: {
        arrowFunction: false,
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: "tsconfig.build.json"
              }
            }
          ],
          exclude: /node_modules/,
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserJSPlugin({ extractComments: false }),
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: path.resolve(process.cwd(), 'package.json'), to: distPath },
        ],
      }),
    ],
    target: 'node',
    mode: 'development',
    stats: 'errors-warnings',
  }
}

module.exports = webpackConfig;
