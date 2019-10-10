import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import BaseEntity from "./BaseEntity";
import User from "./User";
import * as crypto from "crypto";
import { RequestError } from "./exceptions";

@Entity()
export default class Session extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * Key used to restore the session.
     */
    @Column()
    key!: string;

    /**
     * User this session refers to.
     */
    @ManyToOne(() => User, user => user.sessions, { cascade: true })
    user!: User;

    constructor(user?: User) {

        super();
        this.user = user!;

    }

    /**
     * Start a new session. This will automatically save the session to the database.
     */
    async start(): Promise<string> {

        // Generate a session key
        this.key = crypto.randomBytes(16).toString("hex");

        // Save the session
        await this.save();

        // Return it
        return `${this.id}-${this.key}`;

    }

    static async restore(cookies?: string): Promise<User | undefined> {

        // Stop if no cookies were given
        if (!cookies) return;

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

            // Trim the pair values
            pair = pair.map(v => v.trim());

            // Look for the "session" cookie
            if (pair[0].trim() !== "session") continue;

            // Get the session pair
            let sessionPair = pair[1].split("-");

            // It must be of length 2
            if (sessionPair.length !== 2) return;

            // Split the key on hyphens to get the session ID
            let id = parseInt(sessionPair[0]);

            // ID must be a valid number
            if (isNaN(id)) return;

            // Load the session
            let session = await Session.load(id, { relations: ["user"] });

            // Session must exist
            if (!session) return;

            // Key must match
            if (session.key !== sessionPair[1]) return;

            // Get the session
            return session.user;

        }

    }

}
