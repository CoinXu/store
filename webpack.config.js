/**
 * Created on 28/04/2017.
 */

const path = require('path')

module.exports = {
  entry: {
    valid: './__test__/decorate/browser'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
//  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}