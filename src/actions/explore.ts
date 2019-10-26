import { actions } from "..";
import checkContext, { exclusiveEvent } from "../checks";
import ExplorationEvent from "../events/ExplorationEvent";
import areas from "../data/areas";
import Area from "../Area";
import Context from "../Context";
import { InternalRedirect } from "../exceptions";
import { randomRange } from "../utils";

actions["explore"] = checkContext(exclusiveEvent(ExplorationEvent), async context => {

    let event = context.user.currentCharacter.event!;

    // An exploration has already started
    if (event) {

        // Get the action
        let action = event.getAction(context.url[1]);

        // Continuing the exploration
        if (action === "continue") {

            // Increment step
            event.step++;

        }

        // Leave the exploration
        else if (action === "leave") {

            // Leave the exploration
            event.leave(context);

            // Stop the event
            context.user.currentCharacter.event = undefined;

        }

        // If the action ID was given but invalid
        else if (context.url[1]) {

            context.error = context.language.general.invalidActionKey;

        }

        // Display the data
        context.title = event.area.name;
        context.progress = event.step / event.area.length;

        // If the event is still happening
        if (event === context.user.currentCharacter.event) {

            // Show actions
            context.actions = [
                [
                    {
                        text: "Continue",
                        url: "/explore/" + event.addAction("continue"),
                    },
                    {
                        text: "End",
                        url: "/explore/" + event.addAction("leave"),
                    }
                ]
            ];

        }

    }

    // No events right now – Show the map
    else {

        // Starting an exploration
        if (context.url[1]) {

            let area = areas[context.url[1]];

            // If the area exists
            if (area instanceof Area) {

                // Assign the event
                context.user.currentCharacter.event = new ExplorationEvent(area);

                // Redirect to the status
                throw new InternalRedirect("/explore", context);

            }

            // It doesn't
            else {

                // TODO: This might show up when refreshing after ending an exploration. Fix it.
                // Show an error
                context.error = context.language.exploration.invalidID;

            }

        }

        // Display the map
        else displayMap(context);

    }

});

function displayMap(context: Context) {

    let actionList: Common.ActionLink[] = [];

    // Create the context actions list
    if (!context.actions) context.actions = [];

    // Set context data
    context.title = context.language.exploration.areaSelection;

    // Get each area
    for (let areaID in areas) {

        let area = areas[areaID];

        // Skip non-areas
        if (area instanceof Area === false) continue;

        // Add a new item to the list
        actionList.push({

            text: `${area.name} (${context.language.general.levelAbbr} ${area.level})`,
            url: `/explore/${areaID}`,

        });

    }

    // Push the list to context
    context.actions.push(actionList);

}
