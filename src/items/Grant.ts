import Language, { Declension } from "../languages/Language";
import Fighter from "../fight/Fighter";
import Effect from "./Effect";

/**
 * An ability a fighter can do.
 */
export default abstract class Grant {

    /**
     * Type of this grant. This should point to a language key in the "grants" section
     */
    abstract type: (lang: Language) => Declension;

    constructor(readonly effects: Effect[] = []) { }

    /**
     * Apply the grant
     */
    apply(caster: Fighter, target: Fighter) {

        this.effects.forEach(effect => effect.apply(caster, target));

    }

}

export class Skill {

    type = (lang: Language) => lang.grants.skill;

}

export class Spell {

    type = (lang: Language) => lang.grants.spell;

}

export class Attack {

    type = (lang: Language) => lang.grants.attack;

}

export class Passive {

    type = (lang: Language) => lang.grants.passive;

}
