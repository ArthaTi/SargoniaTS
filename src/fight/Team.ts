import Fighter from "./Fighter";
import Language, { Declension } from "../languages/Language";
import ArrayProxy from "../ArrayProxy";
import Fight from "./Fight";
import Character from "../Character";

export default class Team extends ArrayProxy<Fighter> {

    /**
     * If the team is fighting, this will hold the Fight object.
     */
    protected _fight?: Fight;

    get fight() { return this._fight; }
    set fight(value) {

        // Set the fight
        this._fight = value;

        // Summon the intelligence for all members
        this.forEach(this.spawnIntelligence);

    }

    /**
     * Parent team; when this team stops fighting, it is disbanded and all members change their team to the parent
     * team. This is used to enable splitting teams, so members of the team aren't forced to participate in all teams,
     * especially when they are in an blocking event.
     */
    parent?: Team;

    constructor(public name: (lang: Language) => Declension, ...members: Fighter[]) {

        super(...members);
        this.onAdded.push(this.spawnIntelligence);

    }

    /**
     * Create the intelligence of a member. Used when a member is added during a fight or when a fight starts.
     */
    protected spawnIntelligence(fighter: Fighter) {

        // If there is no fight assigned
        if (!this.fight) return;

        // Prevent respawning intelligence if team members are moved or inserted
        if (fighter.currentIntelligence?.fight === this.fight) return;

        // Assign the intelligence
        fighter.currentIntelligence = new fighter.intelligence(fighter, this, this.fight);

    }

    /**
     * Create a child team to participate in a fight.
     */
    split(...members: Fighter[]): Team {

        // Create the team
        let team = new Team(this.name, ...members);

        // Assign parent
        team.parent = this;

        return team;

    }

}
