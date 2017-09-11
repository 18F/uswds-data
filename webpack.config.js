const WEBPACK_USE_POLLING = 'WEBPACK_USE_POLLING' in process.env;

module.exports = {
  entry: './src/entry.js',
  output: {
    filename: 'bundle.js',
  },
  watchOptions: {
    poll: WEBPACK_USE_POLLING,
  },
};
