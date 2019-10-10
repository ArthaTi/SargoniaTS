import Fight from "./Fight";
import BaseEntity from "./BaseEntity";
import { Entity, Column, ManyToOne } from "typeorm";
import User from "./User";

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
    @Column({ unique: true })
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

    constructor(owner?: User, name?: string) {
        super();
        this.owner = owner!;
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
