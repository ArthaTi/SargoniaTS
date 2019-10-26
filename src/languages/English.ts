import Language from "./Language";

const english: Language = {

    general: {

        notFound: "The page couldn't be found",
        level: "level",
        levelAbbr: "lvl"

    },
    character: {

        // Titles
        create: "Create a new character",
        name: "Character name",
        select: "Select character",

        // Errors
        duplicateName: "A character with this name already exists.",
        unnamed: "Please name your character to create it.",
        nameLength: "Name of the character should be between 3 and 20 characters long.",
        invalidName: "Name of the character can only contain English and Polish characters (it can't contain numbers "
            + "nor spaces)",
        invalidID: "No character with this ID/URL can be found. Perhaps you made a typo in the URL address?"

    },
    area: {

        // Titles
        selection: "Select area",

        // Errors
        invalidID: "No area with this ID/URL can be found. Perhaps you made a typo in the URL address?"

    },
    busy: doing => `You are currently busy ${doing.impersonal!()}. End doing it to continue here.`,
    leave: doing => `Stop ${doing.impersonal!()}`,
    actions: {

        exploring: what => ({

            impersonal: () => `exploring ${what}`

        })

    }

};
export default english;
