import Language from "../languages/Language";
import Enemy from "../fight/Enemy";
import { Attributes, Abilities } from "../Stats";

export const rabbit = new Enemy({

    name: (lang: Language) => lang.enemies.rabbit,
    levelRange: [1, 2],

    attributes: new Attributes({
        health: 20,
        stamina: 80,
    }),
    attributeGrowth: new Attributes({
        health: 1,
        stamina: 2,
    }),

    abilities: new Abilities({
        strength: 1,
        intelligence: 2,
        perception: 8,
        dexterity: 10,
        charisma: 8,
    }),
    abilityGrowth: new Abilities({
        perception: 2,
        dexterity: 3,
        charisma: 1,
    }),

});

export const boar = new Enemy({

    name: (lang: Language) => lang.enemies.boar,
    levelRange: [2, 4],

    attributes: new Attributes({
        health: 40,
        stamina: 60,
    }),
    attributeGrowth: new Attributes({
        health: 2,
        stamina: 1,
    }),

    abilities: new Abilities({
        strength: 8,
        intelligence: 1,
        perception: 6,
        dexterity: 4,
        charisma: 3,
    }),
    abilityGrowth: new Abilities({
        strength: 8,
        perception: 6,
        dexterity: 4,
        charisma: 1,
    }),

});

export const deer = new Enemy({

    name: (lang: Language) => lang.enemies.deer,
    levelRange: [3, 5],

    attributes: new Attributes({
        health: 80,
        stamina: 50,
    }),
    attributeGrowth: new Attributes({
        health: 1,
        stamina: 2,
        mana: 1,
    }),

    abilities: new Abilities({
        strength: 6,
        intelligence: 1,
        perception: 7,
        dexterity: 5,
        charisma: 5,
    }),
    abilityGrowth: new Abilities({
        strength: 1,
        perception: 2,
        dexterity: 2,
        charisma: 1,
    })

});

export const wolf = new Enemy({

    name: (lang: Language) => lang.enemies.wolf,
    levelRange: [4, 6],

    attributes: new Attributes({
        health: 60,
        stamina: 80,
    }),
    attributeGrowth: new Attributes({
        health: 1,
        stamina: 2,
    }),

    abilities: new Abilities({
        strength: 8,
        intelligence: 6,
        perception: 6,
        dexterity: 6,
        charisma: 4,
    }),
    abilityGrowth: new Abilities({
        strength: 2,
        intelligence: 1,
        perception: 2,
        dexterity: 2,
        charisma: 1,
    })

});

export default <{ [name: string]: Enemy; }>module.exports;
