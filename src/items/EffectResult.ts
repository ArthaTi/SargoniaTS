import Effect from "./Effect";
import Fighter from "../fight/Fighter";

/**
 * Result of an effect.
 */
export type EffectResult<T = {}> = {

    /**
     * Key/ID of the effect.
     */
    key: string;

    /**
     * Used effect.
     */
    effect: Effect;

    /**
     * Affected fighter.
     */
    fighter: Fighter;

} & T;

/**
 * Map of effect results
 */
export type EffectResultMap = {

    damage: EffectResult<{ damage: number; }>;

    [all: string]: EffectResult;

};
