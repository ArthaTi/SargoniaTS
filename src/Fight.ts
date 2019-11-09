import Team from "./Team";
import Fighter from "./Fighter";

export default class Fight {

    /**
     * Whether the fight started or not
     */
    started = false;

    /**
     * Who has the current turn
     */
    turn?: Fighter;

    constructor(public teams: Team[]) {

    }

}
