import { Column } from "typeorm";

type Numbers<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T];

/**
 * Object representing a list of stats.
 *
 * Always provide a constructor, add a `superLoad()` call in it so the object can initialize properly.
 */
export abstract class Stats {

    /**
     * List of numeric keys in the stat.
     */
    keys: Numbers<Omit<this, "keys">>[] = [];

    /**
     * Load the keys. Required for cloning and other methods to work properly. Call this immediately after `super()`.
     */
    protected superLoad() {

        // Get numeric keys
        for (let key in this) {

            // Skip non-numeric keys
            if (typeof this[key] !== "number") continue;

            // Add to list of keys
            this.keys.push(<any>key);

        }

    }

    clone() {

        let obj = new (<new () => this>this.constructor)();

        // Copy each key
        for (let key of this.keys) {

            obj[key] = this[key];

        }

        return obj;

    }

    sum(other: this): this {

        let obj = this.clone();
        let test = [(this as Stats).keys[0]];

        // Copy each key
        for (let key of this.keys) {

            // @ts-ignore This is entirely valid. TypeScript just can't understand that this will only evaluate if
            // there are any numbers in the object.
            obj[key] += other[key];

        }
        return <any>obj;

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
    mana: number = 0;

    constructor(set?: Partial<Attributes>) {

        super();
        this.superLoad();
        if (set) Object.assign(this, set);

    }

    /**
     * Convert points to real values
     */
    realValues() {

        return new Attributes({
            health: this.health * 2,
            stamina: this.stamina,
            mana: Math.floor(this.mana / 2),
        });

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
        this.superLoad();
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
