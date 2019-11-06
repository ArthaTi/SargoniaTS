import Area from "../Area";
import Language from "../languages/Language";

export const wildForest = new Area({

    name: (lang: Language) => lang.areas.wildForest,
    level: 1,

});

export default <{ [name: string]: Area }>module.exports;
