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

        /**
         * A confirmation for stopping an action.
         */
        confirmStopping: (what: DeclensionInflection) => string,

        /**
         * Shown when the player attempts stopping an action they cannot. For example, a fight cannot be simply left,
         * as there are many too different ways to end it.
         */
        cannotStop: (what: DeclensionInflection) => string,

    };

    /**
     * Some basic, simple words used for buttons. Should start with an uppercase letter.
     */
    simple: {

        yes: string,
        no: string,

        /**
         * Stop doing what you are doing now.
         */
        stop: string,

        /**
         * Instantly end/finish what you are doing now.
         */
        endItNow: string,

        /**
         * Return to something.
         */
        return: string,
    };

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
         * Name of the health attribute.
         */
        health: string,

        /**
         * Name of the stamina attribute.
         */
        stamina: string,

        /**
         * Name of the mana (magic) attribute.
         */
        mana: string,

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

        /**
         * Text shown in the character under the bar when a new level is reached. Keep it as short as possible, don't
         * include the word "level" in it (it's already there) – for example "up" instead of "level up".
         */
        levelUp: string,

    };

    /**
     * All things exploration
     */
    exploration: {

        /**
         * Declension of the word "exploration"
         */
        declension: DeclensionInflection,

        /**
         * Declension of the word "exploration", while exploring something
         */
        explorationOf: (what: Declension) => DeclensionInflection,

        /**
         * Title for the exploration as a verb, used for example to link it on the main page.
         */
        title: string,

        /**
         * Title for the area selection screen.
         */
        areaSelection: string,

        /**
         * Continue button.
         */
        continue: string,

        /**
         * End button.
         */
        end: string,

        /**
         * Shown when exploration ended.
         */
        ended: string,

        /**
         * List of stuff the player gained. Something along the lines: `You gained ${what}`.
         * @param what List of items as a single string.
         */
        gained: (what: Declension) => string,

        /**
         * Button to start another exploration after ending one.
         */
        startAnother: string,

        /**
         * Waiting room description – the step 0 of each exploration.
         *
         * No events happen there, the player can wait for other players to form up a team.
         */
        lobby: string,

        /**
         * Error message shown when entering the area with an invalid ID (client error, shouldn't normally occur in
         * the web client, though it can).
         *
         * Consider informing the user they could have mistyped the URL.
         */
        invalidID: string,

    },

    /**
     * Stuff about fighting.
     */
    fight: {

        declension: DeclensionInflection;

        /**
         * Count of ready players. Two arguments are supplied, one is the amount of players ready, the other
         * is the amount of all players in the fight.
         */
        readyCount: (n: number, outOf: number) => string,

        /**
         * Text informing the player they have to wait for their turn.
         */
        wait: string,

        /**
         * Text for the "I'm ready" button.
         */
        imReady: string,

        /**
         * Text for the "I'm not ready" button – undo being ready.
         */
        unready: string,

        /**
         * Title of the player's current team.
         */
        yourTeam: Declension,

        /**
         * Title of other player's team.
         */
        playerTeam: (leader: string) => Declension,

        /**
         * Title of enemy's team
         */
        enemyTeam: Declension,

        /**
         * Text indicating that a certain player is ready.
         */
        ready: string,

        /**
         * Title of the "target" screen.
         */
        target: string,

    },

    /**
     * Names of available areas.
     */
    areas: {

        wildForest: Declension,

    },

    /**
     * Names of enemies.
     */
    enemies: {

        rabbit: Declension,
        boar: Declension,
        deer: Declension,
        wolf: Declension,

    },

    /**
     * The character is already busy with something else.
     *
     * @param what The thing the character is doing. For example, "exploring a dungeon".
     */
    busy: (what: DeclensionInflection) => string,

    /**
     * Continue the current event.
     */
    return: (what: DeclensionInflection) => string,

}

export type Dynamic<T = string> = (what: T) => string;

/**
 * Declension of a word. Feel free to only use those necessary. If the language doesn't have declensions, you can just
 * provide the "nominative" property.
 */
export type Declension<T = string> = {

    nominative: T,
    accusative?: T,
    genitive?: T,
    dative?: T,
    vocative?: T,
    locative?: T,
    instrumental?: T,
    [other: string]: T | undefined | { [t: string]: T },

};

/**
 * Declension of a word and inflection of its verb form. If the language doesn't have declensions or inflections, you
 * can just provide the "nominative" and "impersonal" properties respectively.
 */
export type DeclensionInflection<T = string> = Declension & {

    singular?: {

        first: T,
        second: T,
        third: T,
        [other: string]: T,

    };

    plural?: {

        first: T,
        second: T,
        third: T,
        [other: string]: T,

    };

    impersonal: T;

};
