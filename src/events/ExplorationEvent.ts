import Event from "./Event";
import Area from "../Area";
import Language from "../languages/Language";
import Context from "../Context";
import { CharacterContext } from "../checks";
import areas from "../data/areas";
import { randomRange } from "../utils";

export default class ExplorationEvent extends Event {

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
        this.status = (lang: Language) => lang.actions.exploring(area.name);

    }

    static displayMap(context: Context) {

        let actionList: Common.ActionLink[] = [];

        // Create the context actions list
        if (!context.actions) context.actions = [];

        // Set context data
        context.title = context.language.exploration.areaSelection;

        // Get each area
        for (let areaID in areas) {

            let area = areas[areaID];

            // Skip non-areas
            if (area instanceof Area === false) continue;

            // Add a new item to the list
            actionList.push({

                text: `${area.name} (${context.language.general.levelAbbr} ${area.level})`,
                url: `/explore/${areaID}`,

            });

        }

        // Push the list to context
        context.actions.push(actionList);

    }

    leave(context: CharacterContext) {

        // Leave the event
        super.leave(context);

        // Save the character
        context.user.currentCharacter.save();

        // Get the language
        let le = context.language.exploration;

        // Add text to it
        context.text += le.ended + "\n";

        // Add actions
        if (!context.actions) context.actions = [];

        context.actions.push([
            {
                text: context.language.exploration.startAnother,
                url: "/explore"
            }
        ]);

    }

    status(lang: Language) {

        return lang.actions.exploring(this.area.name);

    }

    /**
     * Add general data to the exploration, such as the title, progress and tips.
     */
    fillContext(context: CharacterContext) {

        // Step 0
        if (this.step === 0) {

            context.text += context.language.exploration.lobby + "\n";

        }

        // Display the data
        context.title = this.step <= this.area.length

            // Include the target if not crossed the end
            ? `${this.area.name} (${this.step}/${this.area.length})`

            // Bonus zone – don't show the target
            : `${this.area.name} (${this.step})`;

        context.progress = this.step / this.area.length;

        // If the event is still happening
        if (this === context.user.currentCharacter.event) {

            // Show actions
            context.actions = [
                [
                    {
                        text: context.language.exploration.continue,
                        url: "/explore/" + this.addAction("continue"),
                    },
                    {
                        text: context.language.exploration.end,
                        url: "/explore/" + this.addAction("leave"),
                    }
                ]
            ];

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
                context.text += `+${this.xpCombo} XP`;

            }

            // For other events, reset the XP combo
            else this.xpCombo = 0;

            // Random encounter
            if (number === 2) {

            }

            // Other random events, such as finding items
            if (number === 3) {

            }

        }

        // Reached the end and no combo is active nor no other event started
        if (this.step >= this.area.length && !this.xpCombo && this === context.user.currentCharacter.event) {

            // Leave the event
            this.leave(context);

        }

    }

}
