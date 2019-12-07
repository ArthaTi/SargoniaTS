import { Attack } from "../items/Grant";
import Damage from "../effects/Damage";

// Punch
export let punch = new Attack(

    lang => lang.attacks.punch,
    (lang, target) => lang.attacks.punchSomeone(target),

    // Damage the opponent
    new Damage(caster => ({

        multiplier: 2 * Math.sqrt(caster.tempAbilities.strength * 2),

    }))

);

// Bite
export let bite = new Attack(

    // Texts
    lang => lang.attacks.bite,
    (lang, target) => lang.attacks.biteSomeone(target),

    // Damage the opponent
    new Damage(caster => ({

        multiplier: 2 * Math.sqrt(caster.tempAbilities.strength)

    }))
);

export default <{ [name: string]: Attack; }>module.exports;
