/// <reference path="./ActionResponse.ts" />

namespace Common {

    export interface Api {

        /**
         * Title of the page.
         */
        title?: string;

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

}
