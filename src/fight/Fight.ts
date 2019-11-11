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

    constructor(...teams: Team[]) {

        // When a new team is added to the fight
        this.teams.onAdded.push(team => {

            // Assign the fight
            team.fight = this;

            /*
             * onRemove is never bound – Since fights are assigned to the entire team, an individual member leaving
             * the fight will also leave their team. Since everyone in all participating teams is considered
             * participating in the fight itself, leaving a team will mean their intelligence will simply be frozen,
             * as the Fight will forget about the presence of the fighter.
             *
             * It is possible to implement child teams. Members will all be assigned to a "master team", and in case
             * a fight starts, a child team will be created with only the participating team members in it. When
             * the fight ends, the master team is restored to all fighters. See Team.parent for info on implementation.
             */

        });

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
