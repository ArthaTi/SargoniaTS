import Fighter from "../fight/Fighter";
import EffectOptions from "./EffectOptions";
import Language, { Inflection, Declension } from "../languages/Language";
import { EffectResult, EffectResultMap } from "./EffectResult";
import Result from "../fight/Result";
import { Range } from "../utils";

type EffectUpdate = (caster: Fighter) => EffectOptions;

/**
 * Describes a single effect of a grant.
 */
export default abstract class Effect {

    /**
     * Base options of the effect
     */
    options: EffectOptions = {};

    /**
     * Conditions the check needs to fullfill to be used
     */
    conditions?: never[];

    constructor(...args: (EffectOptions | EffectUpdate)[]) {

        // Build the option list
        let options: EffectOptions = {};

        // Iterate on arguments
        for (let arg of args) {

            // Given a function
            if (arg instanceof Function) {

                // Set it
                options.update = arg;

            }

            // Given an option object
            else {

                // Update with the object
                options = { ...options, ...arg };

            }

        }

        // Set the options
        this.options = options;

    }

    /**
     * Label of the effect, shown on the item card.
     */
    abstract name(lang: Language, caster: Fighter, options: Required<EffectOptions>): string;

    /**
     * Get the result of the effect in human language.
     */
    abstract result(lang: Language, result: EffectResult): Declension & Inflection;

    /**
     * Apply the effect
     */
    protected abstract applyEffect(caster: Fighter, target: Fighter, options?: EffectOptions): EffectResult;

    /**
     * Apply the effect.
     *
     * This is a wrapper for `applyEffect` which will, among other things, enable area of effect.
     */
    apply(caster: Fighter, target: Fighter, options?: EffectOptions): EffectResult[] {

        let targets: Fighter[];

        // Apply to everyone
        if (options?.aoe === "everyone") {

            targets = [...target.currentIntelligence!.fight.fighters()];

        }

        // Apply to team
        else if (options?.aoe === "team") {

            targets = target.currentIntelligence!.team;

        }

        // Apply to the single target
        else if (options?.aoe === undefined || options.aoe === 1) {

            targets = [target];

        }

        // Apply to radius
        else {

            /** Team of the target */
            let team = target.currentIntelligence!.team;

            /** Index of the target in their team */
            let index = team.indexOf(target);

            // Values for the range
            let min = Math.max(index - options.aoe + 1, 0);
            let max = Math.min(index + options.aoe, team.length);

            // Iterate on the range
            targets = team.slice(min, max);

        }

        return targets.map(fighter => this.applyEffect(caster, fighter, options));

    }

}
