import { Column } from "typeorm";

export abstract class Stats {

    /**
     * List of numeric keys in the stat.
     */
    keys: (keyof this)[] = [];

    constructor() {

        // Get numeric keys
        for (let key in this) {

            // Skip non-numeric keys
            if (typeof this[key] !== "number") continue;

            // Add to list of keys
            this.keys.push(key);

        }

    }

    clone() {

        let obj = new (<new() => this>this.constructor)();

        // Copy each key
        for (let key of this.keys) {

            obj[key] = this[key];

        }

        return obj;

    }

}

/**
 * Represents the general state of fighter's attributes.
 */
export class Attributes extends Stats {

    @Column()
    health: number = 0;

    @Column()
    stamina: number = 0;

    @Column()
    magic: number = 0;

    constructor(set?: Partial<Attributes>) {

        super();
        if (set) Object.assign(this, set);

    }

}

/**
 * Represents the general state of fighter's abilities
 */
export class Abilities extends Stats {

    @Column()
    strength: number = 0;

    @Column()
    intelligence: number = 0;

    @Column()
    perception: number = 0;

    @Column()
    dexterity: number = 0;

    @Column()
    charisma: number = 0;

    constructor(set?: Partial<Abilities>) {

        super();
        if (set) Object.assign(this, set);

    }

}


/**
 * Represents the points a fighter spent into given attribute.
 */
export class AttributePoints extends Attributes {

    @Column()
    points: number = 0;

}

export class AbilityPoints extends Abilities {

    @Column()
    points: number = 0;

}
