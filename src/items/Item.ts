import Grant from "./Grant";
import Language, { Declension } from "../languages/Language";

export default abstract class Item {

    name!: (lang: Language) => Declension;
    grants!: Grant[];

    constructor(partial: Item) {

        Object.assign(this, partial);

    }

}
