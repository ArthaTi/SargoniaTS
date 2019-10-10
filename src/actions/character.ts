import { actions } from "..";
import Character from "../Character";
import { requireLogin } from "../checks";
import { InternalRedirect } from "../exceptions";

actions["character"] = async context => {

    // Require login
    requireLogin(context);

    // Requested character creation
    if (context.url[1] === "new") {

        // Submitted a character
        if (context.method === "POST") {

            // Get the name
            let name = context.data["name"];

            // Validate data
            if (typeof name !== "string") {

                context.error = "Nadaj swojej postaci imię, by ją utworzyć.";

            }

            // Check length
            else if (name.length < 3 || name.length > 20) {

                context.error = "Imię postaci musi mieć od 3 do 20 znaków.";

            }

            // Check characters
            else if (name.match(/[^a-ząćęóśłżźń]/i)) {

                context.error = "Imię postaci musi składać się tylko z angielskich i polskich liter (nie może mieć "
                    + "cyfr ani spacji)";

            }

            // TODO: Character name must be unique.
            // Requires a database query.

            // Matched, it's valid.
            else {

                // Create the character
                context.user!.currentCharacter = new Character(name);

                // Save it to the database
                await context.user!.currentCharacter.save();

                // Make a request
                context.url = ["character", context.user!.currentCharacter.id.toString()];

                // Run the character
                throw new InternalRedirect("character", context);

            }

        }

        // Show character creation screen
        context.title = "Utwórz postać";
        context.inputs = [{ name: "name", label: "Nazwa postaci" }];

    }

    // Show character selection screen
    else if (context.url[1] === "select") {

        context.title = "Wybierz postać";
        context.actions = [

            [{ text: "Utwórz postać", url: "/character/new" }],

        ];

    }

    // Display a character or perform operations on one
    else {

        // Get character ID from the URL or from the current character
        let id = parseInt(context.url[1]) || (context.character ? context.character.id : undefined);

        // If the URL doesn't contain the character ID
        if (context.url.length <= 1) {

            // User is logged in and has a character picked
            if (context.user && context.user.currentCharacter) {

                context.url.push(context.user.currentCharacter.id.toString());

                // Yeet him into his profile
                throw new InternalRedirect("character", context);

            } else {

                context.url.push("select");

                // Redirect to character selection
                throw new InternalRedirect("character", context);

            }

        }

        // Invalid ID
        if (id === undefined) {

            context.error = "Nieprawidłowe ID postaci.";
            return;

        }

        // Get the character
        let character = await Character.load(id);

        // Character doesn't exist
        if (!character) {

            context.error = "Postać nie istnieje.";
            return;

        }

        context.text += character.name;

    }

};
