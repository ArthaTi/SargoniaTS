import Intelligence from "./Intelligence";
import Fight from "../fight/Fight";
import Fighter from "../fight/Fighter";

export default class OnlyAttack extends Intelligence {

    constructor(fighter: Fighter, fight: Fight) {

        super(fighter, fight);

        // Mark as ready
        fight.ready.add(fighter);

    }

    turn() {

    }

}
