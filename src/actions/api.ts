import { actions } from "..";

/**
 * Display the API
 */
actions["api"] = context => {

    // Output as JSON
    context.type = "json";

    // Remove "api" from the URL
    context.url = context.url.replace(/^\/api\/*/, "/");

    // Run the requested action
    let name = context.url.split("/", 2)[1] || "";

    console.log(context.url, name);

    // If the action exists
    if (name in actions) {

        // Run it
        actions[name](context);

    } else {

        // Run the placeholder
        actions["404"](context);

    }

};
