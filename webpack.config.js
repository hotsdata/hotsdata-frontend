var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Dotenv = require('dotenv-webpack');

const VENDOR_LIBS = [
  'react', 'redux', 'react-redux', 'react-dom'
];

module.exports = {
  devServer: {
    port: 8000,
    inline: true,
    historyApiFallback: true,
  },
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /(\.scss$|\.css)/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        use: 'url-loader?limit=8192',
        test: /\.(png|jpg)$/
      },
      {
        use: 'file-loader',
        test: /\.(ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/
      },
      {
        test: /\.svg$/,
        loader: 'babel-loader?presets[]=es2015,presets[]=react!svg-react-loader',
      },
      {
        loader: 'url-loader',
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        options: {
          limit: 50000,
          mimetype: 'application/font-woff',
          name: './fonts/[hash].[ext]',
        }
      },
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
      systemvars: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};
