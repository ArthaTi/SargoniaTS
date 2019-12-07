import Fighter from "../fight/Fighter";

export default interface EffectOptions {

    /**
     * Effect level.
     */
    level?: number;

    /**
     * Multiplier of the effect's maximum strength.
     *
     * This defaults to 2.
     */
    multiplier?: number;

    /**
     * Area of effect.
     *
     * - Can be set to `team` to apply it to the entire team.
     * - Can be set to `everyone` to apply it to every fighting team.
     */
    aoe?: number | "team" | "everyone";

    /**
     * Change certain options based on the fighter's stats, for example strength.
     */
    update?(caster: Fighter): EffectOptions;

}

export default abstract class EffectOptions {

    /**
     * Sum two EffectOptions objects.
     *
     * Implicitly calls `fill()` filling all missing data.
     */
    static sum(a: EffectOptions, b?: EffectOptions): Required<EffectOptions> {

        let base = this.fill(a);

        // Missing second item
        if (!b) return base;

        return {

            ...base,

            // Increase level
            level: base.level + (b.level || 0),

            // Multiply effect potential
            multiplier: base.multiplier * (b.multiplier || 1),

            // Area of effect – everyone
            aoe: [base.aoe, b.aoe].includes("everyone")
                ? "everyone"

                // Area of effect – team
                : [base.aoe, b.aoe].includes("team")
                    ? "team"

                    // Area of effect – radius
                    : <number>base.aoe * (<number>b.aoe || 0)

        };

    }

    /**
     * Fill all missing data.
     */
    static fill(a: EffectOptions): Required<EffectOptions> {

        // Get the data
        return {

            level: a.level || 0,
            multiplier: a.multiplier || 1,
            update: a.update || (() => { return {}; }),
            aoe: a.aoe || 1,

        };

    }

    static update<T extends EffectOptions>(a: T, caster: Fighter): T {

        // If update is undefined, just return the object
        if (!a.update) return a;

        return {

            ...a,
            ...a.update(caster)

        };

    }

}
