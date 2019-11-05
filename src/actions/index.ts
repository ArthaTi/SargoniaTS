import { actions } from "..";
import { InternalRedirect } from "../exceptions";

actions[""] = context => {

    context.title = "Sargonia";

    // Not logged in
    if (!context.user) {

        // TODO
        return;

    }

    // No character chosen
    if (!context.user.currentCharacter) {

        throw new InternalRedirect("/character/new", context);

    }

    // Other actions
    context.actions = [

        // General events
        [

            {
                text: context.language.exploration.title,
                url: "/explore"
            }

        ]

    ];

};
