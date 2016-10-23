var restify = require('restify'),
  services = require('./services.js');

exports.start = function(host, port){
  //App Server
  var server = restify.createServer({
    name: "myapp"
  });

  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.CORS());
  server.use(restify.fullResponse());

  server.get({
    path: '/api/services',
    version: '0.0.1'
  }, services.getAllServices);

  server.post({
    path: '/api/services/:name/stop',
    version: '0.0.1'
  }, services.stopService);

  server.post({
    path: '/api/services/:name/start',
    version: '0.0.1'
  }, services.startService);

  server.post('/api/ping', services.pingUrl);

  server.listen(port, host, function() {
    console.log('App Server: %s ', port);
  });

}
