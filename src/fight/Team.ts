import Fighter from "./Fighter";
import Language, { Declension } from "../languages/Language";
import ArrayProxy from "../ArrayProxy";

export default class Team extends ArrayProxy<Fighter> {

    constructor(public name: (lang: Language) => Declension, ...members: Fighter[]) {

        super(...members);

    }

}
