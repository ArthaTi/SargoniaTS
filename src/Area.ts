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

}

export default class Area extends InputArea {

    constructor(base: InputArea) {

        super();
        Object.assign(this, base);

    }

}
