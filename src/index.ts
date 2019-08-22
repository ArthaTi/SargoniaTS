import { Server, IncomingMessage, ServerResponse } from "http";
import { promises as fs } from "fs";
import glob from "glob";

type Listener = (request: IncomingMessage, response: ServerResponse) => void;

/**
 * Mapping of strings to functions responding to certain requests.
 *
 * For each request, the first item in the requested path (called "action name") is used as the key to determine
 * the listener. For example, a request to `/hello/world` will execute the function under the key `hello`.
 */
export let actions: { [path: string]: Listener } = {};

// Create the server
let server = new Server();
let host = "localhost", port = 8080;

// Get the location of the /res directory
const res = __dirname + "/../res";

// Bind the events
{

    // Server started
    server.on("listening", () => {

        // Log a message
        console.log("Server started");

    });

    // When someone makes a request to the server
    server.on("request", async (request: IncomingMessage, response: ServerResponse) => {

        // Log a message
        console.log(`${request.method} request on ${request.url}`);

        try {

            // Try opening a file in /res
            let file = await fs.readFile(res + request.url);

            // Write the contents
            response.write(file.toString());

        }

        // Nope, the file doesn't exist
        catch {

            // Send HTML header
            response.setHeader("Content-Type", "text/html;charset=utf-8");

            // Get the action name from the URL
            let name = request.url!.split("/", 2)[1];

            // If the name is bound
            if (name in actions) {

                // Call the bound function
                actions[name](request, response);

            } else {

                // Call the placeholder
                actions["404"](request, response);

            }

        }

        // End the response
        response.end();

    });

}

// Read command line arguments
if (process.argv[2]) {

    // Parse them
    let parsed = process.argv[2].split(":");

    // Read the host and port
    host = parsed[0];
    port = parseInt(parsed[1]) || 80;

}

// Autoload actions
glob(__dirname + "/actions/*.js", async (_error, matches) => {

    // Iterate on matched names
    for (let match of matches) {

        // Import each
        await import(match);

    }

    // Start listening
    server.listen(port, host);

});
