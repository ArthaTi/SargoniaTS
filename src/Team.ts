import Fighter from "./Fighter";
import Language, { Declension } from "./languages/Language";

export default class Team extends Array<Fighter> {

    constructor(public name: (lang: Language) => Declension, ...members: Fighter[]) {

        // Create the array
        super();

        // Add the members
        this.push(...members);

    }

}
