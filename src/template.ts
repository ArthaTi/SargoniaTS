import Context from "./Context";
import { wrap, escapeHTML } from "./utils";
import { ActionLink } from "./ActionResponse";

export default (context: Context) => {

    // HTML template
    if (context.type === "html") return (

        "<!DOCTYPE html>"
        + wrap("html",

            wrap("head",

                // Metadata
                wrap("meta", { charset: "utf-8" }),
                wrap("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
                wrap("title", context.title || "Sargonia"),

                // Stylesheets
                wrap("link", { rel: "stylesheet", href: "/css/index.css" }),

                // Scripts
                wrap("script", {
                    src: "http://code.jquery.com/jquery-3.4.1.min.js",
                    integrity: "sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=",
                    crossorigin: "anonymous"
                }),
                wrap("script", {
                    src: "/js/index.js"
                }),

            ),
            wrap("body",

                wrap("nav", { class: "progress-bar" },

                    // Title of the page
                    wrap("h1", { id: "title" }, context.title || ""),

                    // Character data
                    wrap("a", { id: "character", href: "/characters/1" },

                        // Name of the character
                        wrap("span", { class: "name" }, "Soaku"),

                        // Level progress bar
                        // Wrapped to prevent border collapsing
                        wrap("span",

                            wrap("span", { class: "progress-bar" },

                                wrap("span", { class: "progress-fill", style: "width:0%" })

                            ),

                        ),

                        // Progress bar captions
                        wrap("span", { class: "under-bar" },

                            wrap("span", { class: "level" }, "Poziom 1"),
                            wrap("span", { class: "xp" }, "2 XP"),

                        )

                    ),

                    // Current progress
                    wrap("span", { class: "progress-fill", style: "width:0%" })

                ),

                // Content
                wrap("div", { id: "content" },

                    // Last events
                    wrap("p", { id: "text" },
                        escapeHTML(context.text).replace("\n", wrap("br"))
                    ),

                    // Available inputs
                    wrap("div", { id: "inputs" },

                        // Match each input
                        !context.inputs ? "" : context.inputs.map(input =>

                            wrap("label", input.label,

                                wrap("input", {

                                    name: input.name,
                                    type: input.type || "text",

                                })

                            )

                        )

                    ),

                    // Action and input separator
                    wrap("hr", {

                        id: "inputs-actions-separator",

                        // Show only if both inputs and actions are present
                        style: [context.inputs, context.actions].every(x => x && x.length)
                            ? undefined
                            : "display:none",

                    }),

                    // Available actions
                    wrap("div", { id: "actions" },

                        // Map each context section
                        !context.actions ? "" : context.actions.map(section =>

                            // Create a <div>
                            wrap("div", section.map(item => {

                                const makeLink = (link: ActionLink) =>

                                    // Add each link inside
                                    wrap(
                                        link.url ? "a" : "span",
                                        {
                                            href: link.url || undefined,
                                            class: link.inline ? "inline" : undefined
                                        },
                                        link.text
                                    );

                                // Item is an array
                                if (item instanceof Array) {

                                    // Map each link and wrap in a div
                                    return wrap("div", { class: "row" },
                                        item.map(makeLink)
                                    );

                                } else {

                                    // Return the link plain
                                    return makeLink(item);

                                }

                            }))

                        ),

                    ),

                )

            )

        )
    );

    // JSON template
    else if (context.type === "json") return JSON.stringify(context.error ? {

        error: context.error,

    }
        : {

            title: context.title,
            content: context.text,
            actions: context.actions,

        });

};
