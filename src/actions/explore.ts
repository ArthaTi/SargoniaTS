import { actions } from "..";
import checkContext, { exclusiveEvent } from "../checks";
import ExplorationEvent from "../events/ExplorationEvent";
import areas from "../data/areas";
import Area from "../Area";
import { InternalRedirect } from "../exceptions";

actions["explore"] = actions["exploration"] = checkContext(exclusiveEvent(ExplorationEvent), async context => {

    let event = context.user.currentCharacter.event!;

    // An exploration has already started
    if (event) {

        // Get the action
        let action = event.getAction(context.url[1]);

        // Continuing the exploration
        if (action === "continue") {

            // Increment step
            event.continue(context);

        }

        // Leave the exploration
        else if (action === "leave") {

            // Leave the exploration
            event.leave(context);

        }

        // If the action ID was given but invalid
        else if (context.url[1]) {

            context.error = context.language.general.invalidActionKey;

        }

        // Display data
        event.fillContext(context);

    }

    // No events right now – Show the map
    else {

        let area = areas[context.url[1]];

        // Starting an exploration
        if (context.url[1] && area instanceof Area) {

            // Assign the event
            context.user.currentCharacter.event = new ExplorationEvent(area);

            // Redirect to the status
            throw new InternalRedirect("/explore", context);

        }

        // Display the map
        else ExplorationEvent.displayMap(context);

    }

});
