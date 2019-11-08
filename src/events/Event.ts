import Language, { PersonInflection } from "../languages/Language";
import * as crypto from "crypto";
import { CharacterContext } from "../checks";

export default abstract class Event {

    /**
     * The primary action of the event – where all of it is supposed to happen.
     */
    abstract primaryAction: string;

    /**
     * ID the next action will have.
     */
    private static nextActionID = 0;

    /**
     * Actions the player can do.
     */
    private actions: { [key: string]: string } = {};

    /**
     * Last context text.
     */
    private lastText = "";

    /**
     * Status text of the playing player.
     */
    abstract status(context: Language): PersonInflection;

    /**
     * Fill general data, such as the title and progress of the current event.
     *
     * You can call `super.status(context)` as the last thing in your function to restore last text if none was set.
     *
     * **Warning:** In case a children event starts (such as the `FightEvent`) with this event as a parent, this
     * function will be called anyway. Make sure to check the event before adding any actions.
     */
    fillContext(context: CharacterContext) {

        // Require the primary action to activate
        if (this.primaryAction !== context.url[0]) return;

        // There is context text set
        if (context.text) {

            // Save it
            this.lastText = context.text;

        }

        // No text set
        else {

            // Set the previous one
            context.text = this.lastText;

        }

    }

    /**
     * Properly leave the event
     */
    leave?(context: CharacterContext): void {

        context.user.currentCharacter.event = undefined;

    }

    addAction(name: string): string {

        // Create key for it
        let key = crypto.randomBytes(4).readUInt32LE(0).toString(36) + Event.nextActionID++;

        // Register the action
        this.actions[key] = name;

        // Return the key
        return key;

    }

    /**
     * Get the action name stored under the key. The action list will be cleared after to invalidate previous keys,
     * even if the given key was invalid.
     */
    getAction(key: string): string | undefined {

        // Get the action
        let action = this.actions[key];

        // Invalidate all actions
        this.actions = {};

        return action;

    }

}
