import { actions } from "..";
import checkContext, { exclusiveEvent } from "../checks";
import FightEvent from "../events/FightEvent";
import { InternalRedirect } from "../exceptions";

actions["fight"] = checkContext(exclusiveEvent(FightEvent), context => {

    // No one's fighting there
    if (!context.user.currentCharacter.event) {

        throw new InternalRedirect("/", context);

    }

    // Get the event
    let event = context.user.currentCharacter.event;

    // Get the action
    let action = event.getAction(context.url[1]);

    // Mark as ready
    if (action === "ready") {

        // Mark as ready
        event.markReady(context, context.url[2] !== "no");

    }

    // Targetting
    if (action === "target") {

        // Parse the context
        let indexes = [

            parseInt(context.url[2]),
            parseInt(context.url[3]),

        ];

        // Change the target
        event.target = event.fight.teams[indexes[0]]?.[indexes[1]];

    }

});
