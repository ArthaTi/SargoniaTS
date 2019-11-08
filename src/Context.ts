import User from "./User";
import { ParsedUrlQuery } from "querystring";
import Language from "./languages/Language";
import polish from "./languages/Polish";

export default class Context implements Common.Api {

    redirect?: string;
    title?: string;
    text: string = "";
    inputs?: Common.ActionInput[];
    actions: (Common.ActionLink | Common.ActionLink[])[][] = [];
    error?: string;
    character?: Common.Api["character"];
    progress: number = 0;


    /**
     * URL path the user requested, split on slashes.
     */
    url!: string[];

    /**
     * Request method used.
     */
    method: "GET" | "POST" | string = "GET";

    /**
     * Content type of the page. Defaults to "html", can be set to "json" for API output.
     */
    type: "html" | "json" = "html";

    /**
     * Data the user sent.
     */
    data: ParsedUrlQuery = {};

    /**
     * Current user.
     */
    user?: User;

    /**
     * Language of the game.
     */
    language: Language = polish;

    constructor(partial?: Partial<Context> & Pick<Context, "url">) {

        if (partial) Object.assign(this, partial);

    }

}
