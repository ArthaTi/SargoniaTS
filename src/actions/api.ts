import run, { actions } from "..";

/**
 * Display the API
 */
actions["api"] = context => {

    // Output as JSON
    context.type = "json";

    // Remove "api" from the URL
    context.url.shift();

    // Run the requested action
    let name = context.url[0];

    // If the action exists
    run(name, context);

};
