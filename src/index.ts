import { Server, IncomingMessage, ServerResponse } from "http";
import { promises as fs } from "fs";
import glob from "glob";
import Context from "./Context";
import template from "./template";
import User from "./User";
import * as qs from "querystring";
import { RequestError, Redirect, InternalRedirect } from "./exceptions";
import { createConnection, Connection } from "typeorm";
import Character from "./Character";
import "reflect-metadata";
import Session from "./Session";
import polish from "./languages/Polish";

type Listener = (context: Context) => void | Promise<any>;

/**
 * Database connection
 */
export let connection: Connection;

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

/**
 * Run an action.
 *
 * @param action Name of the action to run.
 * @param context The Context object for the action.
 */
export default async function run(action: string, context: Context) {

    try {

        let result;

        // If the name is bound
        if (action in actions) {

            // Call the bound function
            result = actions[action](context);

        } else {

            // Call the placeholder
            result = actions["404"](context);

        }

        // If it's a promise
        if (result instanceof Promise) {

            // Wait for the result
            await result;

        }

    } catch (e) {

        // A request error was thrown
        if (e instanceof RequestError) {

            // An internal redirect for the API
            if (e instanceof InternalRedirect && context.type === "json") {

                // Add a redirect to the context
                context.redirect = e.target;

                // Load the URL address
                let segments = e.target.split("/").filter(a => a);
                context.url = segments;

                // Request the action
                await run(segments[0], context);

                // Stop – don't rethrow
                return;

            } else {

                // Add message to context
                context.error = e.message;

            }

        }

        // Rethrow the error
        throw e;

    }

}

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

            // Create the context
            // TODO: Rewrite this into an object, not an interface. Would make stuff easier.
            let context: Context = {

                url: request.url!.split("/").filter(v => v),
                type: "html",
                method: request.method!,
                data: {},
                text: "",
                user: await Session.restore(request.headers["cookie"]),
                language: polish,
                progress: 0,

            };

            // Wait for data
            let data = await new Promise<string>(resolve => {

                let data = "";

                // Load the data
                request.on("data", chunk => {

                    // Add up the data
                    data += chunk;

                    // Limit the size to 5 KB
                    if (data.length > 5000) {

                        // Send status code
                        response.statusCode = 413;

                        // Stop the transmission
                        response.end();

                    }

                });

                // Wait for the request to end
                request.on("end", () => resolve(data));

            });

            // Assign the data to context
            context.data = qs.parse(data);

            // Get the action name from the URL
            let name = context.url[0] || "";

            // If no user is set, start a new session
            // TODO: Debugging only! Remove later – only the register action should do this.
            if (!context.user) {

                // Create a new user
                context.user = new User("Yeet");

                // Create a new session
                let session = new Session(context.user);

                // Start a session
                let id = await session.start();

                // Send a cookie
                response.setHeader("Set-Cookie", `session=${id}; path=/; Max-Age=2147483647; HttpOnly`);

            }

            try {

                // Run the action
                await run(name, context);

            } catch (e) {

                // It's a request error
                if (e instanceof RequestError) {

                    // Send the given status code
                    // eslint-disable-next-line
                    response.statusCode = e.code;

                    // It's a redirect
                    if (e instanceof Redirect) {

                        // Set the given header
                        response.setHeader("Location", e.target);

                    }

                }

                // Rethrow other errors
                else throw e;

            }

            // A character is set
            if (context.user && context.user.currentCharacter) {

                let character = context.user.currentCharacter;
                let up = false;

                // Got new level
                if (character.xp >= character.requiredXP()) {

                    // Mark as new one
                    up = true;

                    // Increment level
                    character.level++;

                    // Add points
                    character.attributes.points += 5;
                    character.abilities.points += 2;

                    // Save the character
                    character.save();

                }

                // Set the character
                context.character = {

                    id: character.id,
                    name: character.name,
                    level: character.level,
                    levelProgress: (character.xp - character.requiredXP(character.level - 1)) * 100
                        / character.requiredXP(),
                    xpLeft: character.requiredXP() - character.xp,
                    levelUp: up,

                };

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

    // Connect to database
    connection = await createConnection({

        type: "postgres",
        host: "localhost",
        username: "sargonia",
        password: "db8175",
        database: "sargonia",
        entities: [User, Character, Session],
        synchronize: true

    });

    // Start listening
    server.listen(port, host);

});
