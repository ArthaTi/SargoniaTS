import { actions } from "..";
import checkContext, { exclusiveEvent } from "../checks";
import FightEvent from "../events/FightEvent";
import { InternalRedirect } from "../exceptions";
import Grant from "../items/Grant";

actions["fight"] = checkContext(exclusiveEvent(FightEvent, true), async context => {

    // No one's fighting there
    if (!context.user.currentCharacter.event) {

        throw new InternalRedirect("/", context);

    }

    // Get the data
    let character = context.user.currentCharacter;
    let event = character.event!;
    let action = event.getAction(context.url[1]);

    // Mark as ready
    if (action === "ready") {

        // Mark as ready
        event.markReady(context, context.url[2] !== "no");

        // Attempt to start the fight
        await event.fight.start();

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

    // Use a grant
    if (action === "use") {

        // Convert to number
        let grant = parseInt(context.url[2]);

        // Check if the player has the grant
        if (grant in character.inventory.grantCounts) {

            // No target chosen
            if (!event.target) {

                // TODO: Show an error
                return;

            }

            // Use it
            Grant.map[grant].apply(character, event.target);

            // End turn
            await event.fight.nextTurn();

        }

        // Show an error
        else {

            // TODO

        }

    }

});
