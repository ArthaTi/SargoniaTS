/**
 * Language of the game.
 */
export default interface Language<D extends Declension = Declension, I extends Inflection = Inflection> {

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
        confirmStopping: (what: D & I) => string,

        /**
         * Shown when the player attempts stopping an action they cannot. For example, a fight cannot be simply left,
         * as there are many too different ways to end it.
         */
        cannotStop: (what: D & I) => string,

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

        strength: string,
        intelligence: string,
        dexterity: string,
        perception: string,
        charisma: string,

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
        declension: D & I,

        /**
         * Declension of the word "exploration", while exploring something
         */
        explorationOf: (what: D) => D & I,

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
        gained: (what: D) => string,

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

        declension: D & I;

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
        yourTeam: D,

        /**
         * Title of other player's team.
         */
        playerTeam: (leader: string) => D,

        /**
         * Title of enemy's team
         */
        enemyTeam: D,

        /**
         * Text indicating that a certain player is ready.
         */
        ready: string,

        /**
         * Title of the "target" screen.
         */
        target: string,

        /**
         * Your turn
         */
        yourTurn: D,

        /**
         * Someone's turn.
         */
        turn: (who: D) => D,

        /**
         * You did something (eg. You drank a potion, you took 10 damage).
         */
        youDidSomething: (what: I) => string,

        /**
         * Someone did something (eg. Player drank a potion, Player took 10 damage).
         */
        didSomething: (who: D, what: I) => string,

    },

    /**
     * Names of available areas.
     */
    areas: {

        wildForest: D,

    },

    /**
     * Names of enemies.
     */
    enemies: {

        rabbit: D,
        boar: D,
        deer: D,
        wolf: D,

    },

    /**
     * Grant names and types
     */
    grants: {

        // Grant types
        attack: D;
        skill: D;
        spell: D;
        passive: D;

    };

    /**
     * Information about each effect of a grant shown on item cards.
     */
    effects: {

        /**
         * Get a list of given verbs.
         *
         * For example, "Took 5 damage, got poisoned and bleeds."
         */
        mix: (verb: string[]) => string,

        /**
         * - Noun: Label for damage in item cards, for example "5 damage".
         * - Verb: Taking damage, for example "took 5 damage".
         *
         * @param amount Damage range or number, for example `4` or `3-5`
         */
        damage: (amount: string) => D & I,

    };

    /**
     * Attack types. Please provide verbs in past form.
     */
    attacks: {

        punch: D,
        punchSomeone: (target: D) => I,

        bite: D,
        biteSomeone: (target: D) => I,

    };

    /**
     * All weapons in the game.
     */
    weapons: {

        oldBow: D,

    };

    /**
     * The character is already busy with something else.
     *
     * @param what The thing the character is doing. For example, "exploring a dungeon".
     */
    busy: (what: D & I) => string,

    /**
     * Continue the current event.
     */
    return: (what: D & I) => string,

}

export type Dynamic<Type, Value> = {
    [key in keyof Type]: Type[key] extends object
    ? Dynamic<Type[key], Value>
    : Value
};

/**
 * Declension of a word. Feel free to only use those necessary. If the language doesn't have declensions, you can just
 * provide the "nominative" property.
 */
export type Declension<T = string> = {

    /** Primary form of the word */
    nominative: T,
    accusative?: T,
    genitive?: T,
    dative?: T,
    vocative?: T,
    locative?: T,
    instrumental?: T,

};

/**
 * Declension of a word and inflection of its verb form. If the language doesn't have declensions or inflections, you
 * can just provide the "nominative" and "impersonal" properties respectively.
 */
export type Inflection<T = string> = {

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

export function languageProxy(word: string): Declension;
export function languageProxy(word: string | ((language: Language) => Declension), language: Language): Declension;
export function languageProxy(word: string | ((language: Language) => Declension), language?: Language): Declension {

    if (word instanceof Function) return word(language!);

    return new Proxy(<Declension>{}, {
        get() {

            return word;

        }
    });

}

/**
 * Join an array with `separator`, except for the last occurrence – with `end`
 */
export function joinEnd(array: string[], separator: string, end: string) {

    return [
        ...array.slice(0, -2),
        array.slice(-2).join(end)
    ].join(separator);

}
