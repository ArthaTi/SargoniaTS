import Effect from "../items/Effect";
import { EffectResultMap } from "../items/EffectResult";
import EffectOptions from "../items/EffectOptions";
import { Range, randomRange } from "../utils";
import Fighter from "../fight/Fighter";
import Language from "../languages/Language";

export default class Damage extends Effect {

    protected range(caster: Fighter, options?: EffectOptions) {

        let data = EffectOptions.sum(this.options, options);

        // Update the data
        data = EffectOptions.update(data, caster);

        // Create the range
        return new Range(data.level, (data.level + 2) * data.multiplier);

    }

    name(lang: Language, caster: Fighter, options: EffectOptions) {

        // Return the values
        return lang.effects.damage(this.range(caster, options).toString()).nominative;

    }

    result(lang: Language, result: EffectResultMap["damage"]) {

        // Fill with the damage
        return lang.effects.damage(result.damage.toString());

    }

    applyEffect(caster: Fighter, target: Fighter, options?: EffectOptions): EffectResultMap["damage"] {

        // Get the damage range
        let range = this.range(caster, options);
        let damage = randomRange(range);

        // Apply the damage
        target.tempAttributes.health -= damage;

        return {

            key: "damage",
            effect: this,
            fighter: target,
            damage: damage,

        };

    }

}
