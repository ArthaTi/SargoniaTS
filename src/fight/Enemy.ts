import { Attributes, Abilities, Stats } from "../Stats";
import { randomRange } from "../utils";
import Fighter from "./Fighter";
import Language, { Declension } from "../languages/Language";
import { NewIntelligence } from "../intelligence/Intelligence";
import OnlyAttack from "../intelligence/OnlyAttack";
import Grant from "../items/Grant";

export abstract class InputEnemy {

    /**
     * Name of the enemy.
     */
    name!: (lang: Language) => Declension;

    /**
     * Level range of the enemy.
     */
    levelRange!: [number, number];

    /**
     * Grants the enemy can use.
     */
    grants!: Grant[];

    /**
     * Intelligence type of the enemy.
     */
    intelligence?: NewIntelligence;

    /**
     * Attributes of the enemy.
     */
    attributes!: Attributes;

    /**
     * Abilities of the enemy.
     */
    abilities!: Abilities;

    /**
     * Chances of spending a point on a certain attribute.
     *
     * If all attributes have `1` set on all attributes – they will have equal chances. If one attribute is `2`, it
     * will have twice the chance.
     */
    attributeGrowth!: Attributes;

    /**
     * Chances of spending a point on a certain ability.
     *
     * @see InputEnemy.attributeGrowth for more info.
     */
    abilityGrowth!: Abilities;

}

export default class Enemy extends InputEnemy implements Fighter {

    // Add the level of the enemy
    level: number;

    // Intelligence of the enemy
    intelligence: NewIntelligence = OnlyAttack;

    // General attributes
    generalAttributes: Attributes;
    generalAbilities: Abilities;
    tempAttributes: Attributes;
    tempAbilities: Abilities;

    constructor(base: InputEnemy) {

        super();
        Object.assign(this, base);

        // Get the level
        this.level = randomRange(...base.levelRange);

        // Get the stats
        this.generalAttributes = this.assignGrowth(this.attributeGrowth).realValues().sum(this.attributes);
        this.generalAbilities = this.assignGrowth(this.abilityGrowth).sum(this.abilities);

        // Set current stats
        this.tempAttributes = this.generalAttributes.clone();
        this.tempAbilities = this.generalAbilities.clone();

    }

    /**
     * Generate random object given a growth object.
     */
    private assignGrowth<T extends Stats>(growth: T, points = this.level * 5 - 5): T {

        // Get the sum of the values
        let max = growth.keys.reduce<number>((prev, cur) => prev + <number><unknown>growth[cur], 0);

        // Create a base object
        let base = new (<new () => T>growth.constructor)();

        // Spend the points
        for (let i = 0; i < points; i++) {

            // Get a random number
            let number = randomRange(max);
            let sum = 0;

            // Assign the growth
            for (let key of growth.keys) {

                // Sum the growth
                sum += <number><unknown>growth[key];

                // If the item falls under it
                if (number < sum) {

                    // Spend the point
                    (<number><unknown>base[key])++;

                    // Stop assigning
                    break;

                }

            }

        }

        return base;

    }

}
