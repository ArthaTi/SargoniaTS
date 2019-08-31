namespace Common {

    export interface ActionLink {

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

    export interface ActionInput {

        /**
         * Name (ID) of the input.
         */
        name: string,

        /**
         * Type of the input. Defaults to "text".
         */
        type?: "text" | "number";

        /**
         * Label for the input.
         */
        label?: string,

    }

}
