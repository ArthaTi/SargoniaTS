import User from "./User";
import { ParsedUrlQuery } from "querystring";
import Language from "./languages/Language";

export default interface Context extends Common.Api {

    /**
     * URL path the user requested, split on slashes.
     */
    url: string[];

    /**
     * Request method used.
     */
    method: "GET" | "POST" | string;

    /**
     * Content type of the page. Defaults to "html", can be set to "json" for API output.
     */
    type: "html" | "json";

    /**
     * Data the user sent.
     */
    data: ParsedUrlQuery;

    /**
     * Current user.
     */
    user?: User;

    /**
     * Language of the game.
     */
    language: Language;

}
