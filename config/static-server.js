const fs = require('fs');
const os = require('os');
const path = require('path');
const express = require('express');

const app = express();

const SITE_PATH = path.normalize(`${__dirname}/../public`);

app.use(express.static(SITE_PATH));

module.exports = () => {
  if (!fs.existsSync(SITE_PATH)) {
    console.log(`Please build the site before running me.`);
    process.exit(1);
  }

  return new Promise((resolve, reject) => {
    const server = app.listen(() => {
      const hostname = os.hostname().toLowerCase();
      const port = server.address().port;
      resolve({
        hostname,
        port,
        url: `http://${hostname}:${port}`,
        httpServer: server,
      });
    });
  });
};

module.exports.app = app;
