export default class Character {

    static lastID: number = 0;

    id!: number;

    constructor(public name: string = "") {

        this.id = ++Character.lastID;
    }
}