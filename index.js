var static = require('node-static');
var file = new static.Server({
  cache: 7200,
  serverInfo: "myserver",
  indexFile: "index.htm",
  gzip: true,
  "X-test" : "ok",
  headers : {
    'Connection' : 'keep-alive',
    'Access-Control-Allow-Origin' : "*",
    'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers' : 'content-type'
  }
});
require('http').createServer(function(request, response) {
  if((/\/(src|dist|build)\//).test(request.url)){
    request.addListener('end', function() {
      file.serve(request, response);
    }).resume();
  } else {
    request.addListener('end', function() {
      file.serveFile("index.html",200, {}, request, response);
    }).resume();

  }

}).listen(process.env.PORT || 3000);