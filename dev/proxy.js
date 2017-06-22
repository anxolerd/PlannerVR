const fs = require('fs');
const http = require('http');
const httpProxy = require('http-proxy');

httpProxy.createProxyServer({
  target:'http://localhost:8081',
  ssl: {
    key: fs.readFileSync('key.pem', 'utf8'),
    cert: fs.readFileSync('cert.pem', 'utf8'),
    passphrase: '1234'
  },
}).listen(8000); 
console.log('Running!');
