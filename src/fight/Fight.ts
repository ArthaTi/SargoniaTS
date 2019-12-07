import Team from "./Team";
import Fighter from "./Fighter";
import ArrayProxy from "../ArrayProxy";
import Result from "./Result";

export default class Fight {

    /**
     * Whether the fight started or not.
     */
    started = false;

    /**
     * Current round number, starting from 0.
     *
     * This will be -1 if the fight didn't start yet
     */
    round: number = -1;

    /**
     * Index of the current fighter in the fight order.
     */
    turn?: number;

    /**
     * EP treshold for the fight. Determined when the fight starts.
     *
     * Note: Summons don't count for the treshold.
     */
    epTreshold?: number;

    /**
     * Log of all actions
     */
    log: Result[] = [];

    /**
     * Turn order of the fight. Determined when the fight starts.
     */
    readonly order: Fighter[] = [];

    /**
     * Fighters ready to start.
     */
    readonly ready = new Set<Fighter>();

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

            // Yield its members
            yield* team;

        }

    }

    *alive() {

        // For each fighter
        for (let fighter of this.fighters()) {

            // Skip dead fighters
            if (!Fighter.isAlive(fighter)) continue;

            // Yield other fighters
            yield fighter;

        }

    }

    *enemies(ofTeam: Team) {

        // For each team
        for (let team of this.teams) {

            // Ignore current team
            if (team === ofTeam) continue;

            // Yield others
            yield* team;

        }

    }

    /**
     * Check if all players are ready and start the fight if so.
     */
    async start() {

        // Ignore if the fight has already started
        if (this.started) return;

        // Count fighters
        let count = this.teams.reduce<number>((value, now) => value + now.length, 0);

        // If all of them are ready
        if (count !== this.ready.size) return;

        // Determine turn order
        this.order.push(

            // Create an array of fighters
            ...[...this.fighters()]

                // Sort in descending order
                .sort((a, b) => b.tempAttributes.stamina - a.tempAttributes.stamina)

        );

        // Count the treshold
        this.epTreshold = this.order.reduce((value, fighter) => value + fighter.tempAttributes.stamina, 0);

        // Start the fight
        this.started = true;

        // Announce to all fighters
        for (let fighter of this.fighters()) {

            // Tell them the fight started
            fighter.currentIntelligence!.started();

        }

        // Run AI moves
        await this.nextTurn();

    }

    /**
     * Start the new round. Automatically invoked by `nextTurn`.
     */
    private nextRound() {

        // Count rounds
        this.round++;

        // Reset turn count
        this.turn = 0;

        // Give EP to all fighters
        for (let fighter of this.order) {

            // Set EP to 0 if the fighter just entered the fight
            if (!fighter.ep) fighter.ep = 0;

            // Assign to their stamina
            fighter.ep += fighter.tempAttributes.stamina;

        }

        // Return the character to move
        return this.order[this.turn];

    }

    /**
     * Start the next turn.
     *
     * The promise will resolve when a fighter doesn't immediately do their turn, for example if they're a player.
     */
    nextTurn(): Promise<Fighter> {

        let fighter = this.order[this.turn!];

        // Once the first round (and a single turn after it) passed
        if (this.round >= 1) {

            // Start clearing the log
            this.log.shift();

        }

        // If the fighter has reached the EP treshold
        if (fighter?.ep && fighter.ep! > this.epTreshold!) {

            // Reduce their EP
            fighter.ep! -= this.epTreshold!;

        } else {

            // Switch fighter
            fighter = this.turn !== undefined && this.order[++this.turn] || this.nextRound();

        }

        // Return a promise
        return new Promise(resolve =>

            // Notify them of their turn when the stack is cleared
            setTimeout(() => fighter.currentIntelligence!.turn()

                // Resolve when a fighter doesn't immediately end their turn
                .then(() => resolve(this.order[this.turn!]))

            )

        );

        /*
         * This starts a recursion loop which ends as soon as an entity doesn't end their turn in the same call stack.
         *
         * If not the `setTimeout`, the code could frequently hit call stack limit on long fights, because this
         * function indirectly calls itself.
         */

    }

}
