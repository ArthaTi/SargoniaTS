import { actions } from "..";
import checkContext, { exclusiveEvent } from "../checks";
import ExplorationEvent from "../events/ExplorationEvent";
import areas from "../data/areas";
import Area from "../Area";
import { InternalRedirect } from "../exceptions";

actions["explore"] = actions["exploration"] = checkContext(exclusiveEvent(ExplorationEvent), async context => {

    let event = context.user.currentCharacter.event;

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

            // Ask for confirmation
            context.text = context.language.general.confirmStopping(event.status(context.language)) + "\n";

            // Add options
            context.actions.push([
                {
                    text: context.language.simple.no,
                    url: "/explore",
                    inline: true,
                },
                {
                    text: context.language.simple.stop,
                    url: "/explore/" + event.addAction("leave:ok"),
                    inline: true,
                }
            ]);

        }

        // Leave the exploration – confirmed
        else if (action === "leave:ok") {

            // Leave the exploration
            event.leave(context);

        }

    }

    // No events right now – Show the map
    else {

        let area = areas[context.url[1]];

        // Starting an exploration
        if (context.url[1] && area instanceof Area) {

            // Assign the event
            context.user.currentCharacter.event = new ExplorationEvent(area);

            // Reset stats
            context.user.currentCharacter.tempAttributes = context.user.currentCharacter.generalAttributes;
            context.user.currentCharacter.tempAbilities = context.user.currentCharacter.generalAbilities;

            // Redirect to the status
            throw new InternalRedirect("/explore", context);

        }

        // Display the map
        else ExplorationEvent.displayMap(context);

    }

});
