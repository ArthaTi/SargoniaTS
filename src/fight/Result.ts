import Grant from "../items/Grant";
import { EffectResultMap } from "../items/EffectResult";
import Fighter from "./Fighter";

/**
 * Result of a grant.
 *
 * Includes the grant itself, thus providing the first line of turn. It also includes the effect result array
 */
export default class Result {

    constructor(

        /**
         * Caster of the grant.
         */
        readonly caster: Fighter,

        /**
         * Main target of the grant.
         */
        readonly target: Fighter,

        /**
         * Used grant.
         */
        readonly grant: Grant,

        /**
         * Effects of the grant.
         */
        readonly results: Map<Fighter, Partial<EffectResultMap>>,

    ) { }

}
