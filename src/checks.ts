import Context from "./Context";
import { InternalRedirect } from "./exceptions";

export function requireLogin<T extends Context>(context: T) {

    // If not logged in
    if (context.user === undefined) {

        // Redirect to login
        throw new InternalRedirect("login", context);

    }

}
