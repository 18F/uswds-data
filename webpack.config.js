const WEBPACK_USE_POLLING = 'WEBPACK_USE_POLLING' in process.env;

module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'bundle.js',
  },
  devtool: process.env.NODE_ENV === 'production'
           ? 'source-map'
           : 'eval-source-map',
  watchOptions: {
    poll: WEBPACK_USE_POLLING,
  },
};
