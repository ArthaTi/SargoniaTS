import Fight from "./Fight";
import BaseEntity from "./BaseEntity";
import { Entity, Column, ManyToOne } from "typeorm";
import User from "./User";
import requirement from "./Validator";
import Event from "./events/Event";
import { Attributes, Abilities } from "./Stats";

@Entity()
export default class Character extends BaseEntity {

    /**
     * Owner of this character.
     */
    @ManyToOne(() => User, user => user.characters)
    owner!: User;

    /**
     * Name of the character
     */
    @Column("citext", { unique: true })
    @requirement<string>(
        name => typeof name === "string",
        lang => lang.character.unnamed
    )
    @requirement<string>(
        name => 3 <= name.length && name.length <= 20,
        lang => lang.character.nameLength
    )
    @requirement<string>(
        name => !!name.match(/^[a-ząćęóśłżźń]+$/i),
        lang => lang.character.invalidName
    )
    name!: string;

    /**
     * Level of the character
     */
    @Column()
    level: number = 1;

    /**
     * XP of the character
     */
    @Column()
    xp: number = 0;

    /**
     * The last time the character was in use.
     */
    @Column("bigint")
    lastUse: number = Date.now();

    /**
     * Current events
     */
    event?: Event;

    /**
     * Current fight data
     */
    fight?: Fight;

    /**
     * Attributes of the character.
     */
    @Column(_type => Attributes)
    attributes: Attributes = new Attributes();

    /**
     * Abilities of the character.
     */
    @Column(_type => Abilities)
    abilities: Abilities = new Abilities();

    /**
     * XP required to reach the next level
     */
    requiredXP(level: number = this.level) {

        if (level === 0) return 0;
        return Math.ceil(level ** 3.35 + 4);

    }

}
