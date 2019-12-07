import User from "./User";
import { ParsedUrlQuery } from "querystring";
import Language from "./languages/Language";
import polish from "./languages/Polish";
import querystring from "querystring";

export default class Context implements Common.Api {

    redirect?: string;
    title?: string;
    text: string = "";
    inputs?: Common.ActionInput[];
    readonly actions: (Common.ActionLink | Common.ActionLink[])[][] = [];
    updateActions?: (Common.ActionLink & { id: string })[] = [];
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
    language: Language = polish as any;

    constructor(url: string, partial?: Partial<Context>) {

        this.reset(url, partial);

    }

    protected parseUrl(url: string) {

        let segments = querystring.unescape(url).split("/").filter(a => a);

        // No segments
        if (!segments.length) {

            // Push an empty one
            segments.push("");

        }

        return segments;

    }

    /**
     * Reset output values of the API.
     */
    reset(url?: string, partial?: Partial<Context>) {

        // Nullify output values
        this.text = "";
        this.actions.splice(0, this.actions.length);
        this.updateActions = [];
        this.error = undefined;
        this.progress = 0;

        // Assign the partial
        if (partial) Object.assign(this, partial);

        // Set the URL
        if (url !== undefined) this.url = this.parseUrl(url);


    }

}
