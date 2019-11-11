import Intelligence from "./Intelligence";

export default class OnlyAttack extends Intelligence {

    joined() {

        // Mark as ready
        this.fight.ready.add(this.fighter);

    }

    turn() {

    }

}
