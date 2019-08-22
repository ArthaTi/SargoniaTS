import Context from "./Context";
import { wrap } from "./utils";

export default (context: Context) => (
    "<!DOCTYPE html>"
    + wrap("html",

        wrap("head",

            "<link rel=\"stylesheet\" href=\"/css/index.css\" />"

        ),
        wrap("body", context.content)

    )
);
