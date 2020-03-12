/* Node applications make frequent use of node modules.
    A node module is simply a JS function library with
    some additional code that wraps the functions
    within an object.
    You can then make use of a module via the require()
    function. Most node applications make use of the
    very rich infrastructure of pre-existing modules
    available from npmjs.com
    The http module can be used to create an HTTP server
*/
const http = require('http');

// Configure HTTP server to respond with simple message to all requests
const server = http.createServer(function (request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("Hello this is our first node.js application\n");
    response.end();
});

// Listen on port 8080 on localhost
const port = 8080;
server.listen(port);

// display a message on the terminal
console.log("Server running at port=" + port);