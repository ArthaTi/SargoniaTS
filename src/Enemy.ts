import { Attributes, Abilities, AttributePoints, AbilityPoints } from "./Stats";
import { randomRange } from "./utils";
import Fighter from "./Fighter";
import Language, { Declension } from "./languages/Language";

export abstract class InputEnemy {

    /**
     * Name of the enemy.
     */
    name!: (lang: Language) => Declension;

    /**
     * Level range of the enemy
     */
    levelRange!: [number, number];

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

    // General attributes
    generalAttributes: Attributes = new Attributes();
    generalAbilities: Abilities = new Abilities();
    tempAttributes: Attributes;
    tempAbilities: Abilities;

    constructor(base: InputEnemy) {

        super();
        Object.assign(this, base);

        // Get the level
        this.level = randomRange(...base.levelRange);

        // Get the attributes and abilities
        this.assignGrowth(this.generalAttributes, this.attributeGrowth);
        this.assignGrowth(this.generalAbilities, this.abilityGrowth);

        // Set current stats
        this.tempAttributes = this.generalAttributes.clone();
        this.tempAbilities = this.generalAbilities.clone();

    }

    /**
     * Generate random object given a growth object.
     */
    private assignGrowth<T extends any>(base: T, growth: T, points = this.level * 5 - 5) {

        // Get the eligible iteration keys
        let keys: (keyof T)[] = Object.keys(growth)

            // Only accept numbers
            .filter(val => typeof val === "number");

        // Get the sum of the values
        let max = keys.reduce<number>((prev, cur) => prev + growth[cur], 0);

        // Spend the points
        for (let i = 0; i < points; i++) {

            // Get a random number
            let number = randomRange(max);
            let sum = 0;

            // Assign the growth
            for (let key of keys) {

                // Sum the growth
                sum += growth[key];

                // If the item falls under it
                if (number < sum) {

                    // Spend the point
                    base[key]++;

                    // Stop assigning
                    break;

                }

            }

        }

    }

}
