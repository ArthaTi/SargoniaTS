import User from "./User";
import { ActionLink, ActionInput } from "./ActionResponse";

export default interface Context {

    /**
     * URL path the user requested.
     */
    url: string;

    /**
     * Title of the page.
     */
    title?: string;

    /**
     * Request method used.
     */
    method: "GET" | "POST" | string;

    /**
     * Content type of the page. Defaults to "html", can be set to "json" for API output.
     */
    type: "html" | "json";

    /**
     * Current user.
     */
    user?: User;

    /**
     * Main text of the page.
     */
    text: string;

    /**
     * Inputs the user can fill and submit.
     *
     * Submissions will be sent under the same URL, but with the POST method.
     */
    inputs?: ActionInput[];

    /**
     * Actions the user can do.
     *
     * This is a list of "sections". Each section can be either a list of links (`ActionLink[]`), or a grid of links
     * (`ActionLink[][]`).
     */
    actions?: (ActionLink[] | ActionLink)[][];

    /**
     * If it's a non-empty string, an error message should be displayed.
     */
    error?: string;

}
