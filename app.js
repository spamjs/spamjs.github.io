var portNumber = 5007;

var sys = require("sys"), my_http = require("http");
my_http.createServer(function(request, response) {
	sys.puts("I got kicked");
	response.writeHeader(200, {
		"Content-Type" : "text/plain"
	});
	response.write("Hello World");
	response.end();
}).listen(portNumber);
sys.puts("Server Running on "+portNumber);