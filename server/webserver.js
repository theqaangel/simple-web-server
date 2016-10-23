var http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs");

exports.start = function(index, port){
  //Web Server
  http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname,
      filename = path.join(process.cwd(), uri);

    fs.stat(filename, function(err, stats) {
      if (err) {
        response.writeHead(404, {
          "Content-Type": "text/plain"
        });
        response.write("404 Not Found\n");
        response.end();
        return;
      }

      if (fs.statSync(filename).isDirectory()) filename +=
        index;

      fs.readFile(filename, "binary", function(err, file) {
        if (err) {
          response.writeHead(500, {
            "Content-Type": "text/plain"
          });
          response.write(err + "\n");
          response.end();
          return;
        }

        response.writeHead(200);
        response.write(file, "binary");
        response.end();
      });
    });
  }).listen(port, function() {
    console.log('Web Server: %s', port);
  });

}
