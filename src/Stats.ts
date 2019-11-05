import { Column } from "typeorm";

export class Attributes {

    @Column()
    points = 0;

    @Column()
    health = 100;

    @Column()
    stamina = 50;

    @Column()
    magic = 20;

}

export class Abilities {

    @Column()
    points = 0;

    @Column()
    strength = 10;

    @Column()
    intelligence = 10;

    @Column()
    perception = 10;

    @Column()
    dexterity = 10;

    @Column()
    charisma = 10;

}
