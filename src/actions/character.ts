import { actions } from "..";
import Character from "../Character";
import checkContext, { requireLogin } from "../checks";
import { InternalRedirect } from "../exceptions";
import { QueryFailedError } from "typeorm";
import { validate } from "../Validator";

actions["character"] = actions["characters"] = checkContext(requireLogin, async context => {

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

                    // Run the character
                    throw new InternalRedirect(`/character/${character.id}`, context);


                }

                // An exception was thrown
                catch (e) {

                    // Insertion failed
                    if (e instanceof QueryFailedError) {

                        // Show an error
                        context.error = context.language.character.duplicateName;

                    }

                    // Insertion succeeded
                    else if (e instanceof InternalRedirect) {

                        // Assign as the current character
                        context.user.currentCharacter = character;

                        // Save the user
                        await context.user.save();

                        // Rethrow the exception
                        throw e;

                    }

                    // Rethrow other exceptions
                    else throw e;

                }

            }

        }

        // Show character creation screen
        context.title = context.language.character.create;
        context.inputs = [{ name: "name", label: context.language.character.name }];

    }

    // Show character selection screen
    else if (context.url[1] === "select") {

        context.title = context.language.character.select;
        context.actions = [

            [{ text: context.language.character.create, url: "/character/new" }],

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

                // Yeet him into his profile
                throw new InternalRedirect(`/character/${context.user.currentCharacter.id}`, context);

            } else {

                // Redirect to character selection
                throw new InternalRedirect("/character/select", context);

            }

        }

        // Invalid ID
        if (id === undefined) {

            context.error = context.language.character.invalidID;
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

});
