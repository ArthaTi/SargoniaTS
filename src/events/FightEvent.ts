import Event from "./Event";
import Language, { DeclensionInflection } from "../languages/Language";
import Fight from "../fight/Fight";
import Context from "../Context";
import { CharacterContext } from "../checks";
import Fighter from "../fight/Fighter";

/**
 * Event representing a fight. FightEvent isn't standalone and requires a parent event to keep track of the fight.
 * Once the fight ends, the parent event will be set as the character's current event. The parent event can also bind
 * events to respond to certain actions in the fight.
 *
 * @todo
 */
export default class FightEvent extends Event {

    primaryAction = "fight";

    // Disable leaving
    leave = undefined;

    /**
     * Current target of the player.
     */
    target?: Fighter;

    constructor(public parentEvent: Event, readonly fight: Fight) {

        super();

    }

    status(context: Language): DeclensionInflection {

        return context.fight.declension;

    }

    /**
     * Note: Doesn't call `super()` – implements context restoration itself as a log of actions.
     */
    fillContext(context: CharacterContext) {

        // Fill parent context
        this.parentEvent.fillContext(context);

        // If there are any actions set (dialog) or the event changed
        if (context.actions.length || context.user.currentCharacter.event !== this) return;

        /** List of options */
        let options: Common.ActionLink[] = [];

        // List teams
        this.listTeams(context);

        // Add responses
        {

            let responses: Common.ActionLink[][] = [];

            // Targetting a certain fighter
            if (this.target) {

                responses.push([

                    // Header
                    {
                        header: true,

                        // The word "target"
                        text: context.language.fight.target + " – " + (

                            // Target's name
                            typeof this.target.name === "string"
                                ? this.target.name
                                : this.target.name(context.language).nominative
                        )
                    },

                    // Target's level
                    {
                        text: context.language.general.level + " " + this.target.level,
                    },

                    // Target's attributes
                    {
                        // Health
                        text: context.language.character.health + ": "
                            + this.target.tempAttributes.health + "/" + this.target.generalAttributes.health,
                    },
                    {
                        // Stamina
                        text: context.language.character.stamina + ": "
                            + this.target.tempAttributes.stamina + "/" + this.target.generalAttributes.stamina,
                    },
                    {
                        // Mana
                        text: context.language.character.mana + ": "
                            + this.target.tempAttributes.mana + "/" + this.target.generalAttributes.mana,
                    }

                ]);

            }

            // Add the options to responses
            responses.push(options);

            // Add to list
            context.actions.push(responses);

        }

        // Preparation phase
        if (!this.fight.started) {

            // Show count of ready players
            context.text += context.language.fight.readyCount(
                this.fight.ready.size,
                this.fight.teams.reduce<number>((count, team) => count + team.length, 0)
            ) + "\n";

            // Add a toggle readiness button
            options.push(!this.fight.ready.has(context.user.currentCharacter)

                // Ready
                ? {

                    text: context.language.fight.imReady,
                    url: "/fight/" + this.addAction("ready") + "/yes",

                }

                // Undo ready
                : {

                    text: context.language.fight.unready,
                    url: "/fight/" + this.addAction("ready") + "/no",

                }

            );

        }

        // The fight has started
        else {

            // The players's turn
            if (this.fight.turn === context.user.currentCharacter) {

                context.text = "Fight started *";

            }

            // Somebody else's turn
            else {

                // Add a disabled action showing the state of the fight
                options = [
                    {
                        text: context.language.fight.wait,
                    }
                ];

            }

        }

    }

    /**
     * List all participating teams
     */
    listTeams(context: CharacterContext) {

        // List teams
        let teams: Common.ActionLink[][] = [];
        context.actions.push(teams);
        let indexes = [-1, -1];

        // Generate actions
        let target = this.addAction("target");

        // Add teams
        for (let team of this.fight.teams) {

            // Update indexes
            indexes[0]++;
            indexes[1] = -1;

            // Create the object
            let obj: Common.ActionLink[] = [

                // Team header
                {

                    // If this is the player's team
                    text: context.user.currentCharacter.team === team

                        // Use "Your team" as it's name
                        ? context.language.fight.yourTeam.nominative

                        // Use the team's own name for other teams
                        : team.name(context.language).nominative,

                    header: true,
                }

            ];
            teams.push(obj);

            // Add each member to the list
            for (let member of team) {

                // Update indexes
                indexes[1]++;

                // Add each member
                obj.push({

                    text: (

                        // If they're targetted, add an indicator arrow
                        (this.target === member ? "» " : "")

                        // Add their name
                        + (typeof member.name === "string"
                            ? member.name
                            : member.name(context.language).nominative))

                        // Add level indicator
                        + ` (${context.language.general.levelAbbr} ${member.level})`

                        // If the fight hasn't started yet, add indicator whether they are ready or not
                        + (!this.fight.started && this.fight.ready.has(member)
                            ? " – " + context.language.fight.ready
                            : ""
                        ),

                    url: `/fight/${target}/${indexes[0]}/${indexes[1]}`,

                });

            }

        }

    }

    /**
     * Mark the player as ready or not.
     *
     * @param set If true, mark as ready. If false, mark as unready.
     */
    markReady(context: CharacterContext, set = true) {

        // Add or remove the character
        this.fight.ready[set ? "add" : "delete"](context.user.currentCharacter);

    }

}
