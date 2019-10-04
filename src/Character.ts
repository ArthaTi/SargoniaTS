import Fight from "./Fight";

export default class Character {

    static lastID: number = 0;

    /**
     * ID of the character.
     */
    id!: number;

    /**
     * Current events
     */
    event?: Event;
    fight?: Fight;

    /**
     * The last time the character was in use.
     */
    lastUse: number = Date.now();

    /**
     * Level of the character
     */
    level: number = 1;

    /**
     * XP of the character
     */
    xp: number = 0;

    /**
     * XP required to reach the next level
     */
    requiredXP(level: number = this.level) {

        if (level === 0) return 0;
        return Math.ceil(level ** 3.35 + 4);

    }

    constructor(public name: string = "") {

        this.id = ++Character.lastID;

    }

}
