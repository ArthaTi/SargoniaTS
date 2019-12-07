import { OneToMany, Column, OneToOne } from "typeorm";
import Item from "./items/Item";
import { WeaponType, ArmorType, ScrollType } from "./items/types";
import ArrayProxy from "./ArrayProxy";
import { ExclusiveContext } from "./checks";
import Event from "./events/Event";
import attacks, { punch } from "./data/attacks";

export default class Inventory {

    /**
     * Amount of grants granted by equipped weapons.
     *
     * Check if the player has a grant by using `grant.id in inventory.grantCounts`.
     */
    grantCounts: { [key: number]: number; } = {

        [attacks.punch.id]: 1,

    };

    /**
     * Currently equipped weapon in the left hand.
     */
    @OneToOne(_type => Item, item => item.equipped, { nullable: true })
    weaponLeft?: Item<WeaponType>;

    /**
     * Currently equipped weapon in the right hand.
     */
    @OneToOne(_type => Item, item => item.equipped, { nullable: true })
    weaponRight?: Item<WeaponType>;

    /**
     * Currently equipped armor.
     */
    @OneToOne(_type => Item, item => item.equipped, { nullable: true })
    armor?: Item<ArmorType>;

    /**
     * Currently equipped scrolls.
     */
    @OneToMany(_type => Item, item => item.equipped, { nullable: true })
    scrolls?: ArrayProxy<Item<ScrollType>>;

    /**
     * List of all items owned by the character
     */
    @OneToMany(_type => Item, item => item.owner)
    items!: Item[];

    constructor() {

        // Make a proxy to apply the grants
        return new Proxy<Inventory>(this, {

            // When changed a property
            set: (target: any, property, value) => {

                // Assigned a new item
                if (value instanceof Item) {

                    // Remove the previous grants
                    for (let grant of target[property].base.grants) {

                        // Decrement counter, and if it reaches 0
                        if (--this.grantCounts[grant.id] <= 0) {

                            // Remove from the map, so `in` can be used on it.
                            delete this.grantCounts[grant.id];

                        }

                    }

                    // Assign it
                    target[property] = value;

                    // Add the new grants
                    for (let grant of value.base.grants) {

                        // If the player has the given grant
                        if (grant.id in this.grantCounts) {

                            // Increment counter
                            this.grantCounts[grant.id]++;

                        }

                        // No, they just got it
                        else {

                            // Add it
                            this.grantCounts[grant.id] = 1;

                        }

                    }

                    return true;

                }

                return false;

            }

        });

    }

    displayGrants(context: ExclusiveContext<Event>): Common.ActionLink[][] {

        let result: Common.ActionLink[][] = [];

        // Get the list of items to check
        let items = [

            // Weapons
            this.weaponLeft, this.weaponRight,

            // Armor
            this.armor,

            // Scrolls
            ...(this.scrolls || [])

        ]

            // Remove undefined items
            .filter(v => v !== undefined) as Item[];

        // Add option to punch
        if (!this.weaponLeft && !this.weaponRight) {

            // Add punching
            result.push([

                attacks.punch.display(context),

            ]);

        }

        // For each item
        for (let item of items) {

            // Add a column
            result.push([

                // Header
                {
                    text: item.base.name(context.language).nominative,
                    header: true,
                },

                // Grants
                ...item.base.grants.map(grant => grant.display(context)),

            ]);

        }

        return result;

    }

}
