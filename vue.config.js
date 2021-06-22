const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../seechange-client.the-circle.designone.nl/public'),
    devServer: {
      proxy: {
          '/api/': {
              target: 'http://localhost:8080/'
          }
      }
    }
  };
