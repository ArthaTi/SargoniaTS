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
     * Content of the page.
     */
    content: string;

    /**
     * If it's a non-empty string, an error message should be displayed.
     */
    error?: string;

}
