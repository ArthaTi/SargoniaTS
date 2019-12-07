import { WeaponType } from "../items/types";
import Item from "../items/Item";

export let oldBow = new WeaponType({

    id: "oldBow",
    name: lang => lang.weapons.oldBow,
    grants: [],

});

export default <{ [name: string]: WeaponType; }>module.exports;
