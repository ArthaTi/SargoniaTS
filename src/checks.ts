import Context from "./Context";
import { InternalRedirect } from "./exceptions";
import User from "./User";
import Character from "./Character";

export type UserContext = Context & { user: User };
export type CharacterContext = UserContext & { character: Character };

// Let's hope one day it will be possible to convert this to decorator.

/**
 * Wrap the given function, so that it won't execute if the typeguard fails.
 */
export default function checkContext<T extends Context>(
    wrapper: (context: Context) => context is T,
    func: (context: T) => any
) {

    return (context: Context) => {

        // Check the context
        if (wrapper(context)) {

            // Run the function
            return func(context);

        }

    };

}

export function requireLogin(context: Context): context is UserContext {

    // If not logged in
    if (!context.user) {

        // Redirect to login
        throw new InternalRedirect("/login", context);

    }

    return true;

}

export function requireCharacter(context: Context): context is CharacterContext {

    // Check for login first
    requireLogin(context);

    // If no character is chosen
    if (!context.character) {

        throw new InternalRedirect("/character/select", context);

    }

    return true;

}
