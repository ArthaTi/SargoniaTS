import Fighter from "../fight/Fighter";
import Fight from "../fight/Fight";

/**
 * Represents the "will" of a fighter.
 *
 * - In case of players, it will communicate them with the fight events.
 * - In case of common enemies, this will control their decisions.
 * - In case of summons, this will control their decisions and follow their master's instructions.
 */
export default abstract class Intelligence {

    /**
     * The constructor will be called the moment the entity enters the fight.
     *
     * This might happen before or after a fight starts, make sure to mark the fighter as ready.
     */
    constructor(public fighter: Fighter, public fight: Fight) { }

    /**
     * Called once the fight starts.
     *
     * This won't be called if the fighter was created after the fight has started.
     */
    started() { }

    /**
     * Called when a new round starts.
     *
     * This will be called instantly after `started()`.
     */
    round() { }

    /**
     * Called when someone finishes their turn.
     *
     * @todo Chance action into something meaningful.
     */
    otherFinished(they: Fighter, action: any) { }

    /**
     * This will be called whenever this entity has their turn.
     */
    abstract turn(): void;

}

export type NewIntelligence = new (fighter: Fighter, fight: Fight) => Intelligence;
