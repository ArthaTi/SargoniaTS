export default class User {
    
    static lastID: number = 0;

    id!: number;
    name!: string;
    pass!: string;
   
    constructor() {
        this.id = ++User.lastID;

    }

}