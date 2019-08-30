import { Server, IncomingMessage, ServerResponse } from "http";
import { promises as fs } from "fs";
import glob from "glob";
import Context from "./Context";
import template from "./template";
import User from "./User";

type Listener = (context: Context) => void;

/**
 * Mapping of strings to functions responding to certain requests.
 *
 * For each request, the first item in the requested path (called "action name") is used as the key to determine
 * the listener. For example, a request to `/hello/world` will execute the function under the key `hello`.
 */
export let actions: { [path: string]: Listener } = {};

/**
 * A mapping of extensions to MIME types
 */
export let mimeTypes: { [extension: string]: string } = {
    "css": "text/css; charset=utf-8",
    "js": "text/javascript; charset=utf-8",
    "json": "application/json",
};

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

            // The file exists, get the extension
            let extension = request.url!.match(/\.(\w+)$/) || [];

            // Send the MIME type
            response.setHeader("Content-Type", mimeTypes[extension[1]] || "text/plain; charset=utf-8");

            // Write the contents
            response.write(file.toString());

        }

        // Nope, the file doesn't exist
        catch (error) {

            // Get the action name from the URL
            let name = request.url!.split("/", 2)[1];

            // Create the context
            let context: Context = {

                url: request.url!,
                type: "html",
                content: "",
                user: User.load(request.headers["cookie"]),

            };

            // If no user is set, start a new session
            // TODO: Debugging only! Remove later – only the register action should do this.
            if (!context.user) {

                // Create a new user
                context.user = new User("Yeet");

                // Start a session
                let id = context.user.start();

                // Send a cookie
                response.setHeader("Set-Cookie", `session=${id}`);

            }

            // If the name is bound
            if (name in actions) {

                // Call the bound function
                actions[name](context);

            } else {

                // Call the placeholder
                actions["404"](context);

            }

            // If outputting as HTML
            if (context.type === "html") {

                // Send XHTML header
                response.setHeader("Content-Type", "text/html;charset=utf-8");


            }

            // If outputting as JSON
            else if (context.type === "json") {

                // Send JSON header
                response.setHeader("Content-Type", "application/json");

            }

            // Output the template
            response.write(template(context));

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
