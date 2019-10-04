import Character from "./Character";
import * as crypto from "crypto";
import { RequestError } from "./exceptions";

export default class User {

    static lastID: number = 0;

    /**
     * Active sessions
     */
    static sessions: { [key: string]: User } = {};

    id!: number;
    characters?: Character[];
    currentCharacter?: Character;

    // Current session ID
    sessionID?: string;

    constructor(public name: string = "", public passwordHash: string = "") {

        this.id = ++User.lastID;

    }

    /**
     * Load existing session
     */
    static load(cookies?: string): User | undefined {

        // Parse the cookies
        if (cookies) {

            let pairs = cookies.split(";");

            // Search for the "session" pair
            for (let plainPair of pairs) {

                // Split in two
                let pair = plainPair.split("=");

                // Each pair must have exactly two items
                if (pair.length != 2) {

                    // That's a bad request, throw a Bad Request error in the future
                    throw new RequestError(400, "Bad Request");

                }

                // Look for the "session" cookie
                if (pair[0].trim() !== "session") continue;

                // Get the session
                return this.sessions[pair[1].trim()];

            }

        }

    }

    /**
     * Start a session
     */
    start(): string {

        // Create a random session ID
        this.sessionID = this.id + "-" + crypto.randomBytes(16).toString("hex");

        // Start the session
        User.sessions[this.sessionID] = this;

        return this.sessionID;

    }

}
