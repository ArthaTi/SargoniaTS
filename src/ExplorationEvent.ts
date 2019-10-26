import Event from "./Event";
import Area from "./Area";
import Language from "./languages/Language";

export default class ExplorationEvent extends Event {

    status = (lang: Language) => lang.actions.exploring("???");

    // TODO: make it quittable
    leave = undefined;

    constructor(public area: Area) {

        super();

    }

}
