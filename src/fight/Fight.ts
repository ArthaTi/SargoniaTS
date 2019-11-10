import Team from "./Team";
import Fighter from "./Fighter";
import ArrayProxy from "../ArrayProxy";

export default class Fight {

    /**
     * Whether the fight started or not
     */
    started = false;

    /**
     * Who has the current turn
     */
    turn?: Fighter;

    /**
     * Fighters ready to start.
     */
    ready = new Set<Fighter>();

    /**
     * Teams participating in the fight.
     */
    readonly teams = new ArrayProxy<Team>();

    constructor(teams: Iterable<Team>) {

        // When a new team is added to the fight
        this.teams.onAdded.push(team =>

            // For each member
            team.forEach(member => {

                // If they're already in this fight, ignore them (someone else left it)
                if (member.currentIntelligence?.fight === this) return;

                // Assign the intelligence
                member.currentIntelligence = new member.intelligence(member, this);

            })
        );

        // onRemove is never bound – it could only be called if they or someone else left the battle. There is no need
        // for action then. In case where the fight ends, every member can be called individually without this.

        // Add all the teams to the list
        this.teams.push(...teams);

    }

}
