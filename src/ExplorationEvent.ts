import Event from "./Event";
import Area from "./Area";

export default class ExplorationEvent extends Event {

    constructor(public area: Area) {

        super();

    }

}
