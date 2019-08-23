export default class User {

    static lastID: number = 0;

    id!: number;

    constructor(public name: string = "", public pass: string = "") {

        this.id = ++User.lastID;

    }

}
