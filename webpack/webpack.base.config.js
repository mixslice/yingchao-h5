const path = require('path');
const webpack = require('webpack');
const WebpackConfig = require('webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const node_modules_dir = path.resolve(__dirname, '../node_modules');
const phaserModule = path.join(__dirname, '../node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');


const deps = [
  'moment/min/moment.min.js',
];

const config = {
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    filename: 'bundle.js',
    // publicPath: '/static/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      },
      __SITE_URL__: JSON.stringify(process.env.SITE_URL || 'http://guojian.daguchuangyi.com/')
    }),
    new webpack.ProvidePlugin({
      log: "loglevel",
    }),
  ],
  module: {
    noParse: [],
    loaders: [
      { test: /pixi\.js/, loader: 'expose?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
      { test: /p2\.js/, loader: 'expose?p2' },
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=100000',
        exclude: /node_modules/,
      },
      {
        test: /\.(ttf|png|xml|json|ogg|wav|mp3)/,
        loader: 'file-loader',
        exclude: /node_modules/,
      },
      { test: /\.css$/, loaders: ['style', 'css'] },
    ],
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi.js': pixi,
      'p2': p2,
    },
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    extensions: ['', '.json', '.js' ],
  },
};

deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = new WebpackConfig().merge(config);
