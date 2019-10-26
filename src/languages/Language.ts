/**
 * Language of the game.
 */
export default interface Language {

    /**
     * General names and abbreviations. Everything should be lowercase.
     */
    general: {

        level: string,

        /**
         * Abbreviation for level
         */
        levelAbbr: string,

        /**
         * Text to be displayed on the 404 page, indicating no matching page was found.
         */
        notFound: string,

    }

    /**
     * All language texts related to characters.
     */
    character: {

        /**
         * Title in the character selection screen and links leading to it.
         */
        select: string,

        /**
         * Title in the character creation screen and links leading to it.
         */
        create: string,

        /**
         * Label for the "character name" input box in the character creation screen.
         */
        name: string,

        /**
         * Error message shown when the character name is already in use.
         */
        duplicateName: string,

        /**
         * Error message shown when the character wasn't given a proper name (client error, shouldn't occur in the web
         * client).
         */
        unnamed: string,

        /**
         * Error message shown when the character's name has an invalid length (should be between 3 and 20 characters).
         */
        nameLength: string,

        /**
         * Error message shown when the character's name contains invalid characters.
         */
        invalidName: string,

        /**
         * Error message shown when entering the character's sheet with an invalid ID (client error, shouldn't normally
         * occur in the web client, though it can).
         *
         * Consider informing the user they could have mistyped the URL.
         */
        invalidID: string,

    }

    area: {

        /**
         * Title for the area selection screen.
         */
        selection: string,

        /**
         * Error message shown when entering the area with an invalid ID (client error, shouldn't normally occur in
         * the web client, though it can).
         *
         * Consider informing the user they could have mistyped the URL.
         */
        invalidID: string,

    }

    /**
     * The character is already busy with something else.
     *
     * @param what The thing the character is doing. For example, "exploring a dungeon".
     */
    busy: (what: PersonInflection<() => string>) => string,

    /**
     * Leave the current event, eg. stop the current exploration.
     */
    leave: (what: PersonInflection<() => string>) => string,

    /**
     * Things the player can do. Sometimes included in other language texts.
     *
     * One example of use would be a status text, for example "exploring the Wild Forest". First letter should
     * preferrably be lowercase.
     */
    actions: {

        /**
         * Exploring something.
         */
        exploring: (what: string) => PersonInflection<() => string>,

    }

}

export type Dynamic<T = string> = (what: T) => string;

export type Declension<T = string> = {
    nominative: T,
    accusative: T,
    genitive: T,
    dative: T,
    vocative: T,
    locative: T,
    instrumental: T,
    [other: string]: T,
};

/**
 * Person inflection for the word.
 */
export type PersonInflection<T = string> = {

    singular?: {

        first: T,
        second: T,
        third: T,
        [other: string]: T,

    }

    plural?: {

        first: T,
        second: T,
        third: T,
        [other: string]: T,

    }

    impersonal: T

};
