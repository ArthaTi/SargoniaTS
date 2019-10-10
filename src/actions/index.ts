import { actions } from "..";

actions[""] = context => {

    context.title = "Sargonia";
    context.actions = [];

    // Not logged in
    if (!context.user) {

        return;

    }

    // No character selected
    if (!context.user.currentCharacter) {

        let options: Common.ActionLink[] = [];

        // If the player has some character
        if (context.user.characters)

        // Add the options to list
        context.actions.push(options);
        return;

    }

};
