import run, { actions } from "..";

/**
 * Display the API
 */
actions["api"] = async context => {

    // Output as JSON
    context.type = "json";

    // Remove "api" from the URL
    context.url.shift();

    // Run the requested action
    let name = context.url[0];

    // If the action exists
    await run(name, context);

};
