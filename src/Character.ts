import Fight from "./Fight";

export default class Character {

    static lastID: number = 0;

    id!: number;
    event?: Event;
    fight?: Fight;
    

    constructor(public name: string = "") {

        this.id = ++Character.lastID;

    }

}
