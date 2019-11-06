import Language from "./Language";

const english: Language = {

    general: {

        notFound: "The page couldn't be found",
        level: "level",
        levelAbbr: "lvl",
        invalidActionKey: "Given action key is invalid or expired. Might it be caused by a mistake in the URL?",
        confirmLeaving: what => `Are you sure you want to leave the ${what.nominative}?`,
    },
    simple: {

        leave: "Leave",
        yes: "Yes",
        no: "No",

    },
    character: {

        // Titles
        create: "Create a new character",
        name: "Character name",
        select: "Select character",

        // General texts
        levelUp: "up",

        // Errors
        duplicateName: "A character with this name already exists.",
        unnamed: "Please name your character to create it.",
        nameLength: "Name of the character should be between 3 and 20 characters long.",
        invalidName: "Name of the character can only contain English and Polish characters (it can't contain numbers "
            + "nor spaces)",
        invalidID: "No character with this ID/URL can be found. Perhaps you made a typo in the URL address?"

    },
    exploration: {

        declension: {
            nominative: "exploration",
        },
        inflection: what => ({
            verb: `Explore ${what.nominative}`,
            impersonal: `Exploring ${what.nominative}`,
        }),

        // Titles
        title: "Exploration",
        areaSelection: "Select area",

        // Buttons
        continue: "Continue",
        end: "End",

        // Ending
        ended: "Exploration finished!",
        gained: what => `You've gained ${what.nominative}.`,
        startAnother: "Start another",

        // Descriptions
        lobby: "Welcome to the lobby. Here you can wait for other players and invite them to a team. However, you can "
            + "always just continue and start the exploration right away.",

        // Errors
        invalidID: "No area with this ID/URL can be found. Perhaps you made a typo in the URL address?"

    },
    areas: {
        wildForest: {
            nominative: "The Wild Forest"
        }
    },
    busy: doing => `You are currently busy ${doing.impersonal}. End doing it to continue here.`,
    leave: doing => `Stop ${doing.impersonal}`,
    return: doing => `Continue ${doing.impersonal}`

};
export default english;
