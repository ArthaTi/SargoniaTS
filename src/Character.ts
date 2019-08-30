import Fight from "./Fight";

export default class Character {

    static lastID: number = 0;

    /**
     * ID of the character.
     */
    id!: number;

    event?: Event;
    fight?: Fight;

    /**
     * The last time the character was in use.
     */
    lastUse: number = Date.now();

    constructor(public name: string = "") {

        this.id = ++Character.lastID;

    }

}
