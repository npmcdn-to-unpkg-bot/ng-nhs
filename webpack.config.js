var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(ROOT_PATH, 'app'),
    'bootstrap-loader'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'app'],
    extension: ['', '.js', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 3 versions',
          'sass?outputStyle=expanded'
        ]
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url?limit=10000'
      },
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports?jQuery=jquery'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      jQuery: "jquery"
    })
  ],
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'public'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  }
};
