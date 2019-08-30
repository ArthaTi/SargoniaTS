import Context from "./Context";
import { wrap, escapeHTML } from "./utils";

export default (context: Context) => {

    // HTML template
    if (context.type === "html") return (

        "<!DOCTYPE html>"
        + wrap("html",

            wrap("head",

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
                })

            ),
            wrap("body",

                wrap("nav"),

                wrap("p", { id: "content", class: "value-content" },
                    escapeHTML(context.content).replace("\n", wrap("br"))
                )

            )

        )
    );

    // JSON template
    else if (context.type === "json") return JSON.stringify(context.error ? {

        error: context.error,

    } : {

        title: context.title,
        content: context.content,

    });

};
