import Language, { Declension, Inflection, Dynamic } from "../languages/Language";
import Fighter from "../fight/Fighter";
import Effect from "./Effect";
import { EffectResult, EffectResultMap } from "./EffectResult";
import EffectOptions from "./EffectOptions";
import Result from "../fight/Result";
import { Entity } from "typeorm";
import Character from "../Character";
import { ExclusiveContext } from "../checks";
import FightEvent from "../events/FightEvent";
import Event from "../events/Event";

/**
 * An ability a fighter can do.
 */
export default abstract class Grant {

    static map: { [id: number]: Grant } = {};
    static nextID = 0;

    id: number;

    /**
     * Type of this grant. This should point to a language key in the "grants" section
     */
    abstract type: (lang: Language) => Declension;

    /**
     * Effects of the grant.
     */
    readonly effects: Effect[];

    /**
     * Options to apply to the effect.
     */
    options: EffectOptions = {};

    constructor(

        /**
         * Name of the grant.
         */
        readonly name: (lang: Language) => Declension,

        /**
         * Description of the grant.
         */
        readonly description: (language: Language, target: Declension) => Inflection,

        // Effects
        ...effects: Effect[]

    ) {

        this.effects = effects;

        // Assign IDs
        this.id = Grant.nextID++;
        Grant.map[this.id] = this;

    }

    /**
     * Apply the grant
     */
    apply(caster: Fighter, target: Fighter, options?: EffectOptions): Map<Fighter, Partial<EffectResultMap>> {

        // Clone the options
        options = EffectOptions.sum(this.options, options);

        // Create an object with the result
        let final: Map<Fighter, Partial<EffectResultMap>> = new Map();

        // Look up the effects
        this.effects.map(effect => {

            // Apply each
            let effResult = effect.apply(caster, target, options);

            // Get results
            for (let result of effResult) {

                // Assign
                let effects = final.get(result.fighter);

                // The fighter hasn't been affected before
                if (!effects) {

                    // Get their data
                    effects = {};

                    // Insert
                    final.set(result.fighter, effects);

                }

                // Add this effect
                effects[result.key] = result;

            }

        });

        // Add to the fight log
        caster.currentIntelligence!.fight.log.push(new Result(caster, target, this, final));

        return final;

    }

    /**
     * View effect labels of this grant
     */
    effectLabels(caster: Fighter, language: Language, options?: EffectOptions) {

        // Clone the options
        let sum = EffectOptions.sum(this.options, options);

        // Look up the options
        return this.effects.map(effect => effect.name(language, caster, sum));

    }

    clone(options: EffectOptions): this {

        // Create a new object
        return {

            // Clone of this
            ...this,

            // With given options added
            options: { ...this.options, ...options },

        };

    }

    display(context: ExclusiveContext<Event>, action = "use"): Common.ActionLink {

        let event = context.user.currentCharacter.event!;

        return {

            text: this.name(context.language).nominative,
            url: `/${event.primaryAction}/${event.addAction(action)}/${this.id}`,

        };

    }

}

export class Skill extends Grant {

    type = (lang: Language) => lang.grants.skill;

}

export class Spell extends Grant {

    type = (lang: Language) => lang.grants.spell;

}

export class Attack extends Grant {

    type = (lang: Language) => lang.grants.attack;

}

export class Passive extends Grant {

    type = (lang: Language) => lang.grants.passive;

}
