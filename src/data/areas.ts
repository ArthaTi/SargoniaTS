import Area from "../Area";
import Language from "../languages/Language";
import { rabbit, deer, boar, wolf } from "./enemies";

export const wildForest = new Area({

    name: (lang: Language) => lang.areas.wildForest,
    level: 1,
    enemies: [
        rabbit, boar, deer,
        Object.assign([wolf], { count: <[number, number]>[2, 3] })
    ],

});

export default <{ [name: string]: Area }>module.exports;
