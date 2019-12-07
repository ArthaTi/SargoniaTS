import Language, { Declension } from "../languages/Language";
import Grant from "./Grant";
import Item from "./Item";
import EffectOptions from "./EffectOptions";

export default abstract class BaseItem {

    static map: { [id: string]: BaseItem } = {};

    /**
     * ID of the base.
     */
    id!: string;

    /**
     * Type of the item.
     */
    abstract type: string;

    /**
     * Name of the item.
     */
    name!: (lang: Language) => Declension;

    /**
     * Grants of the item.
     */
    grants!: Grant[];

    constructor(item: Pick<BaseItem, "id" | "name" | "grants">) {

        Object.assign(this, item);

        // Register
        BaseItem.map[this.id] = this;

    }

    create(options?: EffectOptions): Item {

        // Get the item
        let item = new Item(this);

        // Assign the options
        Object.assign(item, options);

        return item;

    }

}
