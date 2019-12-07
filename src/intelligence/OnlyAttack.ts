import Intelligence from "./Intelligence";
import { randomRange, getFirst } from "../utils";
import Enemy from "../fight/Enemy";
import Fighter from "../fight/Fighter";

/**
 * Uses a random grant on the first available enemy.
 */
export default class OnlyAttack extends Intelligence {

    fighter!: Enemy;

    joined() {

        // Mark as ready
        this.fight.ready.add(this.fighter);

    }

    async turn() {

        // Use a random grant
        let rand = randomRange(this.fighter.grants.length);

        // Get it
        let grant = this.fighter.grants[rand];

        // Use it on the first alive enemy
        grant.apply(this.fighter,
            getFirst(this.fight.enemies(this.team), Fighter.isAlive)!
        );

        // End the turn
        await this.fight.nextTurn();

    }

}
