import Language, { PersonInflection } from "../languages/Language";
import Context from "../Context";
import * as crypto from "crypto";

export default abstract class Event {

    /**
     * ID the next action will have.
     */
    private static nextActionID = 0;

    /**
     * Actions the player can do.
     */
    private actions: { [key: string]: string } = {};

    /**
     * Status text of the playing player.
     */
    abstract status(context: Language): PersonInflection;

    /**
     * Properly leave the event
     */
    leave(_context?: Context): void { }

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
