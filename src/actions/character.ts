import { actions } from "..";
import Character from "../Character";
import { requireLogin } from "../checks";
import { InternalRedirect } from "../exceptions";
import { QueryFailedError } from "typeorm";
import { validate } from "../Validator";

actions["character"] = async context => {

    // Require login
    requireLogin(context);

    // Requested character creation
    if (context.url[1] === "new") {

        // Submitted a character
        if (context.method === "POST") {

            // Create it
            let character = new Character();
            character.name = <string>context.data["name"];

            // Validate the character
            if (validate(context, character)) {

                try {

                    // Save the character to the database
                    await character.save();

                    // Assign as the current character
                    context.user!.currentCharacter = character;

                    // Make a request
                    context.url = ["character", character.id.toString()];

                    // Run the character
                    throw new InternalRedirect("character", context);


                }

                // An exception was thrown
                catch (e) {

                    // Insertion failed
                    if (e instanceof QueryFailedError) {

                        // Show an error
                        context.error = context.language.character.duplicateName;

                    }

                    // Rethrow other exceptions
                    else throw e;

                }

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

        context.title = character.name;
        context.text += `Poziom ${character.level} – XP ${character.xp}/${character.requiredXP()}\n`;

    }

};
