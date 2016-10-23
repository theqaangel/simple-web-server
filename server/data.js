var fs = require('fs'),
  dataPath = './data/',
  dataExtension = ".json";

exports.getData = function(dataType, callback) {

  var dataFile = dataPath + dataType + dataExtension;
  console.log('Get data from ' + dataFile);

  fs.readFile(dataFile, 'utf8', function(err, data) {
    if (err) {
      callback(err, data);
    }
    else {
      var jsonData = JSON.parse(data);
      callback(err, jsonData);
    }
  });
};
