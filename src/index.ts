import { Server, IncomingMessage, ServerResponse } from "http";

let server = new Server();

// Bind the events
{

    // Server started
    server.on("listening", () => {

        // Log a message
        console.log("Server started");

    });

    // When someone makes a request to the server
    server.on("request", (request: IncomingMessage, response: ServerResponse) => {

        // Log a message
        console.log(`${request.method} request on ${request.url}`);

        // Reply with a simple greeting
        response.write("Hello, World!");

        // Note: This is not a valid HTTP response. The server should send a file type.

        // End the response
        response.end();

    });

}

// Set default parameters
let host = "localhost", port = 8080;

// Read command line arguments
if (process.argv[2]) {

    // Parse them
    let parsed = process.argv[2].split(":");

    // Read the host and port
    host = parsed[0];
    port = parseInt(parsed[1]) || 80;

}

// Start listening
server.listen(port, host);
