import Fight from "./Fight";
import BaseEntity from "./BaseEntity";
import { Entity, Column } from "typeorm";

@Entity()
export default class Character extends BaseEntity {

    /**
     * Name of the character
     */
    @Column()
    name: string;

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

    constructor(name?: string) {
        super();
        this.name = name!;
    }

    /**
     * XP required to reach the next level
     */
    requiredXP(level: number = this.level) {

        if (level === 0) return 0;
        return Math.ceil(level ** 3.35 + 4);

    }

}

console.log(Reflect.getMetadata("design:type", Character, "lastUse"));
