import Fighter from "../fight/Fighter";

/**
 * Describes a single effect of a grant.
 */
export default class Effect {

    constructor(

        /**
         * Apply the effect.
         */
        readonly apply: (caster: Fighter, target: Fighter) => undefined,

        /**
         * Conditions the check needs to fullfill to be used
         */
        readonly conditions?: never[],

    ) { }

}
