/**
 * Created on 28/04/2017.
 */

const path = require('path')

module.exports = {
  entry: {
    test: './test/test.js',
    // example
    simple: './example/simple/view.js',
    'multi-models': './example/multi-models/view.js',
    'with-react': './example/with-react/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
}