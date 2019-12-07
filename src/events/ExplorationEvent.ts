import Event from "./Event";
import Area from "../Area";
import Language from "../languages/Language";
import Context from "../Context";
import { CharacterContext, ExclusiveContext } from "../checks";
import areas from "../data/areas";
import { randomRange } from "../utils";
import Enemy, { InputEnemy } from "../fight/Enemy";
import Fight from "../fight/Fight";
import FightEvent from "./FightEvent";
import { InternalRedirect } from "../exceptions";
import Team from "../fight/Team";

export default class ExplorationEvent extends Event {

    primaryAction = "explore";

    /**
     * Current step in the exploration.
     */
    step = 0;

    /**
     * Stuff earned during the exploration.
     */
    earnings = {

        xp: 0,
        gold: 0,
        items: [],

    };

    /**
     * Current XP combo.
     */
    xpCombo: number = 0;

    constructor(public area: Area) {

        super();
        this.status = (lang: Language) => lang.exploration.explorationOf(area.name(lang));

    }

    static displayMap(context: Context) {

        let actionList: Common.ActionLink[] = [];

        // Set context data
        context.title = context.language.exploration.areaSelection;

        // Get each area
        for (let areaID in areas) {

            let area = areas[areaID];

            // Skip non-areas
            if (area instanceof Area === false) continue;

            // Add a new item to the list
            actionList.push({

                text: `${area.name(context.language).nominative} (${context.language.general.levelAbbr} ${area.level})`,
                url: `/explore/${areaID}`,

            });

        }

        // Push the list to context
        context.actions.push(actionList);

    }

    leave(context: CharacterContext) {

        // Leave the event
        super.leave!(context);

        // Save the character
        context.user.currentCharacter.save();

        // Get the language
        let le = context.language.exploration;

        // Add text to it
        context.text += le.ended + "\n";

        context.actions.push([
            {
                text: context.language.exploration.startAnother,
                url: "/explore"
            }
        ]);

    }

    status(lang: Language) {

        return lang.exploration.explorationOf(this.area.name(lang));

    }

    /**
     * Add general data to the exploration, such as the title, progress and tips.
     */
    fillContext(context: ExclusiveContext<this>) {

        // Display the data
        context.title = this.step <= this.area.length

            // Include the target if not crossed the end
            ? `${this.area.name(context.language).nominative} (${this.step}/${this.area.length})`

            // Bonus zone – don't show the target
            : `${this.area.name(context.language).nominative} (${this.step})`;

        context.progress = this.step / this.area.length;

        // If the event is still happening or a dialog is shown
        if (this === context.user.currentCharacter.event && !context.actions.length) {

            // Step 0
            if (this.step === 0) {

                context.text += context.language.exploration.lobby + "\n";

            }

            // Show actions
            context.actions.push([

                {
                    text: context.language.exploration.continue,
                    url: "/explore/" + this.addAction("continue"),
                },
                {
                    text: context.language.exploration.end,
                    url: "/explore/" + this.addAction("leave"),
                }

            ]);

            // Restore context
            super.fillContext(context);

        }

    }

    /**
     * Continue the exploration.
     */
    continue(context: CharacterContext) {

        // Increment step
        this.step++;

        // Start a random event
        {

            // Get a number from one to three
            let number = randomRange(1, 3);

            // Get XP
            if (number === 1) {

                // Increase combo by the area level, limited to the character's current level
                this.xpCombo += Math.min(this.area.level, context.user.currentCharacter.level);

                // Add XP
                this.earnings.xp += this.xpCombo;
                context.user.currentCharacter.xp += this.xpCombo;

                // Add description text
                context.text += `+${this.xpCombo} XP\n`;

                return;

            }

            // Reached the end and combo ended
            else if (this.step >= this.area.length) {

                // Leave
                this.leave(context);

                // Don't start any new events
                return;

            }

            // For other events, reset the XP combo
            this.xpCombo = 0;

            // Random encounter, as long as there are any enemies available
            if (number === 2 && this.area.enemies?.length) {

                /** Enemies the player will fight */
                let enemies = new Team(lang => lang.fight.enemyTeam);

                // Get a random enemy group
                let groupP = this.area.enemies[randomRange(this.area.enemies.length)];

                /** Chosen group of enemies */
                let group: InputEnemy[] & { count?: [number, number]; } = groupP instanceof Array ? groupP : [groupP];

                // Get the opponent count
                let count = group.count || [1, 3];

                // Get the opponents
                do {

                    // Get a random enemy
                    let input = group[randomRange(group.length)];

                    // Add it to the team
                    enemies.push(new Enemy(input));

                }

                // Repeat if there is less enemies than required, or on a 1/3 chance unless reached the limit
                while (enemies.length < count[0] || enemies.length < count[1] && !randomRange(3));

                // Get the character
                let character = context.user.currentCharacter;

                // Create the fight
                let fight = new Fight(character.team.split(character), enemies);

                // Create and start the event
                context.user.currentCharacter.event = new FightEvent(this, fight);

                // Redirect to /fight
                throw new InternalRedirect("/fight", context);

            }

            // Other random events, such as finding items
            else {

                // There should always be some text. Even if this hasn't been implemented yet.
                context.text += "Yeet\n";

            }

        }

        // Reached the end and no combo is active nor no other event started
        // Note: !this.xpCombo might not be necessary
        if (this.step >= this.area.length && !this.xpCombo && this === context.user.currentCharacter.event) {

            // Leave the event
            this.leave(context);

        }

    }

}
