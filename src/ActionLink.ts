export default interface ActionLink {

    /**
     * Text of the link.
     */
    text: string;

    /**
     * URL the link goes to. If not provided, the link will be disabled.
     */
    url?: string;

    /**
     * If true, the link will be shown next to other inline links.
     */
    inline?: boolean;

}
