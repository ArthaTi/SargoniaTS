import { actions } from "..";

actions["characters"] = context => {

    // Requested character creation
    if (context.url[1] === "new") {

        // Submitted a character
        if (context.method === "POST") {

            // TODO: Save a character

        }

        // Show character creation screen
        else {

            context.title = "Utwórz postać";
            context.inputs = [{ name: "name", label: "Nazwa postaci" }];

        }

    }

    // Show character selection screen
    else {

        context.title = "Wybierz postać";
        context.actions = [

            [{ text: "Utwórz postać", url: "/characters/new" }],

        ];

    }

};
