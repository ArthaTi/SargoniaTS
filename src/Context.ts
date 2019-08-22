export default interface Context {

    /**
     * URL path the user requested.
     */
    url: string,

    /**
     * Title of the page.
     */
    title?: string,

    /**
     * Content of the page.
     */
    content: string,

}
