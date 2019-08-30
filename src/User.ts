import Character from "./Character";

export default class User {

    static lastID: number = 0;

    id!: number;
    characters!: Character[];

    constructor(public name: string = "", public passwordHash: string = "") {

        this.id = ++User.lastID;

    }

}
