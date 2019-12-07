import Event from "./Event";
import Language, { languageProxy, Inflection, Declension } from "../languages/Language";
import Fight from "../fight/Fight";
import { CharacterContext, ExclusiveContext } from "../checks";
import Fighter from "../fight/Fighter";

/**
 * Event representing a fight. FightEvent isn't standalone and requires a parent event to keep track of the fight.
 * Once the fight ends, the parent event will be set as the character's current event. The parent event can also bind
 * events to respond to certain actions in the fight.
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

    status(context: Language): Declension & Inflection {

        return context.fight.declension;

    }

    /**
     * Note: Doesn't call `super()` – implements context restoration itself as a log of actions.
     */
    fillContext(context: ExclusiveContext<this>) {

        // Fill parent context
        this.parentEvent.fillContext(context);

        // If there are any actions set (dialog) or the event changed
        if (context.actions.length || context.user.currentCharacter.event !== this) return;

        /** List of options */
        const responses: Common.ActionLink[][] = [];
        const options: Common.ActionLink[] = [];

        // List teams
        this.listTeams(context);

        // Add targets and push options
        {

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
                    {
                        text: "",
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
                    },
                    {
                        text: "",
                    },

                    // Target's abilities
                    {
                        text: context.language.character.strength + ": "
                            + this.target.tempAbilities.strength,
                    },
                    {
                        text: context.language.character.intelligence + ": "
                            + this.target.tempAbilities.intelligence,
                    },
                    {
                        text: context.language.character.dexterity + ": "
                            + this.target.tempAbilities.dexterity,
                    },
                    {
                        text: context.language.character.perception + ": "
                            + this.target.tempAbilities.perception,
                    },
                    {
                        text: context.language.character.charisma + ": "
                            + this.target.tempAbilities.charisma,
                    },

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

            let fighter = this.fight.order[this.fight.turn!];

            // Display fight log
            for (let action of this.fight.log) {

                // Push action initiator
                context.text += context.language.fight.didSomething(

                    // Get the caster
                    languageProxy(action.caster.name, context.language),

                    // Get the grant description
                    action.grant.description(context.language, languageProxy(action.target.name, context.language))

                ) + "\n";

                // Add results of the action
                for (let [fighter, results] of action.results.entries()) {

                    const mix: <T extends any>(objects: T[]) => T = objects => {

                        let obj: any = objects[0];
                        let result: any = {};

                        // Iterate on keys
                        for (let key in obj) {

                            // Object
                            if (typeof obj[key] === "object") {

                                // Call recursively
                                result[key] = mix(objects.map(obj => obj[key]));

                            }

                            // String
                            else if (typeof obj[key] === "string") {

                                // Get the key
                                result[key] = context.language.effects.mix(objects.map(obj => obj[key]));

                            }

                        }

                        return result;

                    };

                    let arr: Inflection[] = [];

                    // Get the arguments
                    for (let arg in results) {

                        let result = results[arg]!;

                        // Humanize everything
                        arr.push(result.effect.result(context.language, result));

                    }

                    // Add to text
                    context.text += context.language.fight.didSomething(

                        languageProxy(fighter.name, context.language),
                        mix(arr),

                    ) + "\n";

                }

            }

            // The players's turn
            if (fighter === context.user.currentCharacter) {

                // View grants
                responses.push(...context.user.currentCharacter.inventory.displayGrants(context));

            }

            // Somebody else's turn
            else {

                // Add text showing the state of the fight
                options.push(
                    {

                        // Turn owner
                        text: context.language.fight.turn(

                            // A static name (no declension)
                            typeof fighter.name === "string"

                                // Put it in a proxy
                                ? languageProxy(fighter.name)

                                // Otherwise just get the name
                                : fighter.name(context.language)

                        ).nominative,

                        // Header for the turn
                        header: true,

                    },
                    {
                        // "Wait for your turn"
                        text: context.language.fight.wait,
                    },
                );

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
                    progress: member.tempAttributes.health / member.generalAttributes.health,

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
