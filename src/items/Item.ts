import BaseItem from "./BaseItem";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, Index } from "typeorm";
import EffectOptions from "./EffectOptions";
import Character from "../Character";

@Entity()
@Index(["id", "level"])
export default class Item<T extends BaseItem = BaseItem> implements EffectOptions {

    @PrimaryGeneratedColumn()
    id: number = 0;

    /**
     * Base item
     */
    get base() {

        return BaseItem.map[this.baseID];

    }
    set base(value) {

        this.baseID = value.id;

    }

    /**
     * ID of the base item.
     */
    @Column()
    protected baseID!: string;

    /**
     * Amount of the item owned.
     */
    @Column()
    amount: number = 0;

    /**
     * Level of the item.
     */
    @Column()
    level: number = 0;

    /**
     * Owner of the item
     */
    @ManyToOne(_type => Character, char => char.inventory.items)
    owner?: Character;

    /**
     * Whether the item is equipped. Applies only to spells.
     */
    @ManyToOne(_type => Character)
    equipped: boolean = false;

    constructor(base?: T | string) {

        // Ignore if the base wasn't given
        if (!base) return;

        // Given a string
        if (typeof base === "string") {

            // Assign the ID
            this.baseID = base;

        }

        // Given an object
        else {

            // Assign it
            this.base = base;

        }

    }

}
