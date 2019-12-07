import Context from "./Context";
import { wrap, escapeHTML } from "./utils";

export default (context: Context) => {

    /**
     * If the given value is false, return the "display:none;" CSS rule.
     */
    const show = (what: any) => what ? undefined : "display:none;";

    // HTML template
    // TODO: Refactor to multiple functions with server-side jQuery – this way there will only be one code for both
    // the client and server necessary. The code is already similar enough it should be easy to do.
    if (context.type === "html") return (

        "<!DOCTYPE html>"
        + wrap("html",

            wrap("head",

                // Metadata
                wrap("meta", { charset: "utf-8" }),
                wrap("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
                wrap("title", context.title ? `Sargonia – ${context.title}` : "Sargonia"),

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
                    wrap("a",

                        // A character is selected, link to it
                        context.character ? {
                            id: "character",
                            href: `/character/${context.character.id}`,
                        } :

                            // No character selected, link to character selection menu
                            {
                                id: "character",
                                href: "/character/select",
                                style: "display:none;"
                            },

                        // Name of the character
                        wrap("span", { class: "name" },
                            context.character ? context.character.name : "Brak postaci"
                        ),

                        // Level progress bar
                        // Wrapped to prevent border collapsing
                        wrap("span", { class: "progress-bar-wrapper" },

                            wrap("span", { class: "progress-bar" },

                                wrap("span", {
                                    class: "progress-fill",
                                    style: `width:${context.character ? context.character.levelProgress : 0}%`
                                })

                            ),

                        ),

                        // Progress bar captions
                        wrap("span", { class: "under-bar" },

                            wrap("span", { class: "level" },
                                context.character ? `Poziom ${context.character.level}` : ""
                            ),
                            wrap("span",
                                {
                                    class: "xp-counter xp-left", title: "XP do następnego poziomu",
                                    style: show(context.character && !context.character.levelUp)
                                },

                                // No character – empty label
                                context.character ? `${context.character.xpLeft} XP` : ""

                            ),
                            wrap("span",
                                {
                                    class: "xp-counter level-up", title: "",
                                    style: show(!context.character || context.character.levelUp)
                                },
                                context.language.character.levelUp
                            ),

                        )

                    ),

                    // Current progress
                    wrap("span", {
                        id: "nav-progress", class: "progress-fill",
                        style: `width:${Math.min(context.progress * 100, 100)}%`
                    })

                ),

                // Content
                wrap("div", { id: "content" },

                    // Last events
                    wrap("p",

                        {
                            id: "text",
                            style: show(context.text)
                        },

                        escapeHTML(context.text).replace(/\n/g, wrap("br"))

                    ),

                    wrap("p",

                        {
                            id: "error",
                            style: show(context.error)
                        },

                        escapeHTML(context.error || "").replace("\n", wrap("br"))
                    ),

                    // Available inputs
                    wrap("form",

                        {
                            id: "inputs",
                            method: "POST",
                            style: show(context.inputs && context.inputs.length)
                        },

                        // Match each input
                        !context.inputs ? "" : context.inputs.map(input =>

                            wrap("label", input.label,

                                wrap("input", {

                                    name: input.name,
                                    type: input.type || "text",

                                })

                            )

                        )

                            // Add a submit button
                            + wrap("input", { type: "submit", value: "OK" })

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
                        context.actions.map(section =>

                            // Create a <div>
                            wrap("div", section.map(item => {

                                const makeLink = (link: Common.ActionLink) =>

                                    // Add each link inside
                                    wrap(
                                        link.url ? "a" : "span",
                                        {
                                            href: link.url || undefined,
                                            class: [
                                                link.inline ? "inline" : "",
                                                link.header ? "header" : "",
                                                link.progress !== undefined ? "progress-bar" : "",
                                            ].join(" ")
                                        },
                                        link.text,
                                        link.progress !== undefined
                                            ? wrap("span", {
                                                class: "progress-fill",
                                                style: `width:${link.progress*100}%`
                                            })
                                            : "",
                                    );

                                // Item is an array
                                if (item instanceof Array) {

                                    // Map each link and wrap in a div
                                    return wrap("div", { class: "column" },
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
    else if (context.type === "json") {

        let response: Common.Api = {

            redirect: context.redirect,
            title: context.title,
            text: context.text,
            error: context.error,
            actions: context.actions,
            inputs: context.inputs,
            character: context.character,
            progress: Math.min(context.progress, 1),

        };

        // Stringify the response
        return JSON.stringify(response);

    }

};
