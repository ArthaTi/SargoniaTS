/// <reference path="./ActionResponse.ts" />

namespace Common {

    export interface Api {

        /**
         * If present, the URL should be changed to this one. Consider this a redirect resolved by the server: you
         * don't have to make any additional requests, as it includes the data for the given action too.
         *
         * Note: `/api` prefix won't be included in the redirect content.
         */
        redirect?: string;

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

        /**
         * Character data to be shown in upper-left corner
         */
        character?: {

            id: number;
            name: string;
            level: number;
            levelProgress: number;
            xpLeft: number;

        };

        /**
         * Fraction of the progress bar to be filled.
         */
        progress?: number;

    }

}
