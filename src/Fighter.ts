import { Attributes, Abilities } from "./Stats";
import Language, { Declension } from "./languages/Language";

export default interface Fighter {

    /**
     * Name of the fighter.
     */
    name: string | ((lang: Language) => Declension);

    /**
     * Level of the fighter.
     */
    level: number;

    /**
     * General (max) attributes of the fighter.
     */
    generalAttributes: Attributes;

    /**
     * General abilities of the fighter.
     */
    generalAbilities: Abilities;

    /**
     * Current, temporary values of the fighter's attributes.
     */
    tempAttributes: Attributes;

    /**
     * Current, temporary values of the fighter's abilities.
     */
    tempAbilities: Abilities;

}
