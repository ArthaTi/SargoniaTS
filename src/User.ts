import Character from "./Character";
import { Entity, Column, OneToMany } from "typeorm";
import BaseEntity from "./BaseEntity";
import Session from "./Session";

@Entity()
export default class User extends BaseEntity {

    @Column()
    name: string;

    @Column()
    passwordHash: string;

    /**
     * Characters owned by the character.
     */
    @OneToMany(() => Character, character => character.owner)
    characters!: Character[];

    /**
     * Sessions for the user
     */
    @OneToMany(() => Session, session => session.user)
    sessions!: Session[];

    /**
     * Currently active character.
     */
    currentCharacter?: Character;

    // Current session ID
    sessionID?: string;

    constructor(name: string = "", passwordHash: string = "") {
        super();
        this.name = name;
        this.passwordHash = passwordHash;
    }

}
