import Language, { Declension } from "./languages/Language";
import { InputEnemy } from "./fight/Enemy";

export abstract class InputArea {

    /**
     * Name of the area.
     */
    name!: (lang: Language) => Declension;

    /**
     * Recommended level of the area.
     *
     * Some random events depend on this value.
     */
    level!: number;

    /**
     * Length of the area, i.e. minimum amount of steps to finish.
     */
    length? = 10;

    /**
     * Enemies that can be encountered in the area.
     *
     * This is a list of enemy groups. A random group will be chosen and a given amount of enemies from it will be
     * spawned. A group can be represented by a single EnemyInput object or by an array of those.
     */
    enemies?: (InputEnemy[] & { count?: [number, number] } | InputEnemy)[];

}

export default class Area extends InputArea {

    // Make length required
    length: number = 10;

    constructor(base: InputArea) {

        super();
        Object.assign(this, base);

    }

}
