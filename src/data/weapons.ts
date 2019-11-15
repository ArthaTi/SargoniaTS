import { Weapon } from "../items/types";

export let oldBow = new Weapon({

    name: lang => lang.weapons.oldBow,
    grants: [],

});

export default <{ [name: string]: Weapon; }>module.exports;
