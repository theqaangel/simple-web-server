var webserver = require('./server/webserver.js'),
  appserver = require('./server/appserver.js'),
  config = require('config'),
  host = config.get('host'),
  appServerPort = config.get('appserver.port'),
  webServerPort = config.get('webserver.port');

//Trust all certificates
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

console.log('Host: %s ', host);
appserver.start(host, appServerPort);
webserver.start('client/index.html', webServerPort);
