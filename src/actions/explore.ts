import { actions } from "..";
import checkContext, { exclusiveEvent } from "../checks";
import ExplorationEvent from "../ExplorationEvent";
import areas from "../data/areas";
import Area from "../Area";
import Context from "../Context";
import { InternalRedirect } from "../exceptions";

actions["explore"] = checkContext(exclusiveEvent(ExplorationEvent), async context => {

    let event = context.user.currentCharacter.event!;

    // An exploration has already started
    if (event) {

        // TODO
        context.title = event.area.name;
        context.text = "Test";
        context.progress = 0.5;

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

                // Show an error
                context.error = context.language.area.invalidID;

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
    context.title = context.language.area.selection;

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
