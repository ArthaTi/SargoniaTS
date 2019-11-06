import { Column } from "typeorm";

export class Attributes {

    @Column()
    points: number = 0;

    @Column()
    health: number = 100;

    @Column()
    stamina: number = 50;

    @Column()
    magic: number = 20;

}

export class Abilities {

    @Column()
    points: number = 0;

    @Column()
    strength: number = 10;

    @Column()
    intelligence: number = 10;

    @Column()
    perception: number = 10;

    @Column()
    dexterity: number = 10;

    @Column()
    charisma: number = 10;

}
