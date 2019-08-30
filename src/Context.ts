import User from "./User";
import ActionLink from "./ActionLink";

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
     * Content type of the page. Defaults to "html", can be set to "json" for API output.
     */
    type: "html" | "json";

    /**
     * Current user.
     */
    user?: User;

    /**
     * Content of the page.
     */
    content: string;

    /**
     * Actions the user can do.
     */
    actions?: ActionLink[][];

    /**
     * If it's a non-empty string, an error message should be displayed.
     */
    error?: string;

}
