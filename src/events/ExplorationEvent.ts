import Event from "./Event";
import Area from "../Area";
import Language from "../languages/Language";
import Context from "../Context";

export default class ExplorationEvent extends Event {

    /**
     * Current step in the exploration.
     */
    step = 0;

    /**
     * Stuff earned during the exploration
     */
    earnings = {

        xp: 0,
        gold: 0,
        items: [],

    };

    constructor(public area: Area) {

        super();
        this.status = (lang: Language) => lang.actions.exploring(area.name);

    }

    leave(context?: Context) {

        if (!context) return;

        let le = context.language.exploration;

        context.text += le.ended + "\n";

    }

    status(lang: Language) {

        return lang.actions.exploring(this.area.name);

    }

}
