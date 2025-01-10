const webpack = require('webpack');

module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/"),
      "zlib": require.resolve("browserify-zlib"),
      "fs": false,  // We don't need 'fs' in the browser
      "assert": require.resolve("assert/"),
      "buffer": require.resolve("buffer/"),
    };

    return config;
  },
};
