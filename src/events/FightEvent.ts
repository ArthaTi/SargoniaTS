import Event from "./Event";
import Language, { PersonInflection } from "../languages/Language";
import Fight from "../Fight";
import Context from "../Context";
import { CharacterContext } from "../checks";
import Fighter from "../Fighter";

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

    /** Who has the current turn */
    turn?: Fighter;

    constructor(public parentEvent: Event, readonly fight: Fight) {

        super();

    }

    status(context: Language): PersonInflection {

        return context.fight.inflection;

    }

    /**
     * Note: Doesn't call `super()` – implements context restoration itself as a log of actions.
     */
    fillContext(context: CharacterContext) {

        // Fill parent context
        this.parentEvent.fillContext(context);

        // If there are any actions set (dialog) or the event changed
        if (context.actions.length || context.user.currentCharacter.event !== this) return;

        // The players's turn
        if (this.turn === context.user.currentCharacter) {

            context.text = "Fight started *";

        }

        // Somebody else's turn
        else {

            // Add a disabled action showing the state of the fight
            context.actions = [
                [
                    {
                        text: context.language.fight.wait,
                    }
                ]
            ];

        }

    }

}
