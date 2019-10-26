import Event from "./Event";
import Language, { PersonInflection } from "../languages/Language";

/**
 * Event representing a fight. FightEvent isn't standalone and requires a parent event to keep track of the fight.
 * Once the fight ends, the parent event will be set as the character's current event. The parent event can also bind
 * events to respond to certain actions in the fight.
 *
 * @todo
 */
export default class FightEvent extends Event {

    constructor(public parentEvent: Event) {

        super();

    }

    leave() {

    }

    status(context: Language): PersonInflection {

        throw new Error("Not implemented.");

    }

}
