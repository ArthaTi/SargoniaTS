import { actions } from "..";
import checkContext, { requireCharacter } from "../checks";
import { InternalRedirect } from "../exceptions";

actions["stop"] = actions["leave"] = checkContext(requireCharacter, context => {

    let event = context.user.currentCharacter.event;

    // No event
    if (!event) {

        // Redirect to home page
        throw new InternalRedirect("/", context);

    }

    let doing = event.status(context.language);
    let action = event.getAction(context.url[1]);

    // If the player cannot leave the event
    if (!event.leave) {

        // Show an error
        context.error = context.language.general.cannotStop(doing);

        // Add an option to return to the event
        context.actions.push([
            {
                text: context.language.return(doing),
                url: "/" + event.primaryAction,
            }
        ]);

        return;

    }

    // Add a confirmation
    if (action === "stop:yes") {

        // Leave the event
        event.leave(context);

        // Get the requested page
        let page = context.url[2] || "";

        /*
         * Security consideration: The page was most likely sent by server, because the action key is valid. If it
         * wasn't, a script must have been reading the player's page – so we can't prevent harmful redirections anyway.
         */

        // Redirect to the page
        throw new InternalRedirect("/" + page, context);

    }

    // Confirmation hasn't been shown before
    else {

        // Show it
        context.text = context.language.general.confirmStopping(doing);

        // Add buttons
        context.actions.push([

            {
                text: context.language.simple.no,
                url: "/" + event.primaryAction,
                inline: true,
            },
            {
                text: context.language.simple.stop,
                url: "/stop/" + event.addAction("stop:yes") + "/" + (context.url[2] || ""),
                inline: true,
            },

        ]);

    }

});
