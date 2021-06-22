const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, './public_html'),
    devServer: {
      proxy: {
          '/api/': {
              target: 'http://localhost:8080/'
          }
      }
    }
  };
