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

    *fighters() {

        // For each team
        for (let team of this.teams) {

            yield* team;

        }

    }

    /**
     * Check if all players are ready and start the fight if so.
     */
    start() {

        // Ignore if the fight has already started
        if (this.started) return;

        // Count fighters
        let count = this.teams.reduce<number>((value, now) => value + now.length, 0);

        // If all of them are ready
        if (count !== this.ready.size) return;

        // Start the fight
        this.started = true;

        // Announce this to all fighters
        for (let fighter of this.fighters()) {

            // Tell each the fight started
            fighter.currentIntelligence!.started();

        }

    }

}
