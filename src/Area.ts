export abstract class InputArea {

    /**
     * Name of the area.
     */
    name!: string;

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

}

export default class Area extends InputArea {

    // Make length required
    length: number = 10;

    constructor(base: InputArea) {

        super();
        Object.assign(this, base);

    }

}
