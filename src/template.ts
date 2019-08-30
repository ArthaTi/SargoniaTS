import Context from "./Context";
import { wrap, escapeHTML } from "./utils";

export default (context: Context) => {

    // HTML template
    if (context.type === "html") return (

        "<!DOCTYPE html>"
        + wrap("html",

            wrap("head",

                wrap("link", { rel: "stylesheet", href: "/css/index.css" }),

            ),
            wrap("body",

                wrap("nav"),

                wrap("p", { id: "content", class: "value-content" },
                    escapeHTML(context.content)
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
