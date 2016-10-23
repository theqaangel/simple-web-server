var data = require('./data.js');

exports.getAllServices = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  data.getData('services', function(err, data) {
    if (err) {
      res.send(500, err);
    } else {
      res.send(200, data);
    }
  });
};

exports.stopService = function(req, res, next) {
  var exec = require('child_process').exec;
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {

    if (typeof(req.params.name) === 'undefined') {
      res.send(500, 'Service can not be determined');
    }

    if (typeof(req.body) === 'undefined') {
      res.send(500, 'Stop command is not provided');
    }

    var serviceName = req.params.name;
    var payload = req.body;

    if (payload.stop !== null) {
      exec(payload.stop, function(error, stdout, stderr) {
        if (error === null) {
          res.send(200, serviceName + " is stopped");
        } else {
          res.send(500, "Error appears during execution of the command." +
            error);
        }
      });
    } else {
      res.send(500, 'Stop command is not provided');
    }
  } catch (err) {
    res.send(500, 'Ooops! We broke something! Try again in a minute!');
  }
};

exports.startService = function(req, res, next) {
  var exec = require('child_process').exec;
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {

    if (typeof(req.params.name) === 'undefined') {
      res.send(500, 'Service can not be determined');
    }

    if (typeof(req.body) === 'undefined') {
      res.send(500, 'Start command is not provided');
    }

    var serviceName = req.params.name;
    var payload = req.body;

    if (payload.start !== null) {
      exec(payload.start, function(error, stdout, stderr) {
        if (error === null) {
          res.send(200, serviceName + " is started");
        } else {
          res.send(500, "Error appears during execution of the command." +
            error);
        }
      });
    } else {
      res.send(500, 'Start command is not provided');
    }
  } catch (err) {
    res.send(500, 'Ooops! We broke something! Try again in a minute!');
  }
};

exports.pingUrl = function(req, res, next) {
  var request = require("request");
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {

    if (typeof(req.body) === 'undefined') {
      res.send(500, 'URL is not provided');
    }

    var payload = req.body;

    if (payload.url !== null) {
      request(payload.url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          res.send(200, 'PONG');
        } else {
          res.send(500, 'ERROR');
        }
      });
    } else {
      res.send(500, 'URL is not provided');
    }

  } catch (err) {
    res.send(500, 'Ooops! We broke something! Try again in a minute!');
  }
};
