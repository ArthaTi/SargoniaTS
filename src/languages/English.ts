import Language, { Declension, Inflection, joinEnd } from "./Language";

const english: Language<Declension, EnglishInflection> = {

    general: {

        notFound: "The page couldn't be found",
        level: "Level",
        levelAbbr: "lvl",
        confirmStopping: what => `Are you sure you want to stop ${what.impersonal}?`,
        cannotStop: what => `You cannot stop ${what.impersonal}!`
    },
    simple: {

        yes: "Yes",
        no: "No",
        stop: "Stop",
        endItNow: "End it now",
        return: "Return",

    },
    character: {

        // Titles
        create: "Create a new character",
        name: "Character name",
        select: "Select character",

        // General texts
        levelUp: "up",

        // Attributes
        health: "Health",
        stamina: "Stamina",
        mana: "Mana",

        // Abilities
        strength: "Strength",
        intelligence: "Intelligence",
        dexterity: "Dexterity",
        perception: "Perception",
        charisma: "Charisma",

        // Errors
        duplicateName: "A character with this name already exists.",
        unnamed: "Please name your character to create it.",
        nameLength: "Name of the character should be between 3 and 20 characters long.",
        invalidName: "Name of the character can only contain English and Polish characters (it can't contain numbers "
            + "nor spaces)",
        invalidID: "No character with this ID/URL can be found. Perhaps you made a typo in the URL address?",

    },
    exploration: {

        declension: {
            nominative: "exploration",
            impersonal: "exploring",
            first: "explore",
            third: "explores"
        },
        explorationOf: what => ({
            impersonal: `exploring ${what.nominative}`,
            first: `explore ${what.nominative}`,
            third: `explores ${what.nominative}`,
            nominative: `exploration of ${what.nominative}`,
        }),

        // Titles
        title: "Explore",
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
    fight: {

        declension: {
            nominative: "fight",
            impersonal: "fighting",
            first: "fight",
            third: "fights"
        },

        readyCount: (n, outOf) => `${n} out of ${outOf} fighters are ready.`,

        // Actions
        wait: "Wait for your turn...",
        imReady: "I'm ready!",
        unready: "Wait, I'm not ready yet!",

        // Teams
        yourTeam: { nominative: "your team" },
        playerTeam: leader => ({ nominative: `${leader}'s team` }),
        enemyTeam: { nominative: "enemy team" },

        // Turns
        turn: who => ({ nominative: `${who.nominative}'s turn` }),
        yourTurn: { nominative: "your turn" },

        // Actions
        didSomething: (who, what) => `${who.nominative} ${what.third}.`,
        youDidSomething: (what) => `You ${what.first}.`,

        // Other texts
        ready: "Ready",
        target: "Target",

    },
    areas: {

        wildForest: {
            nominative: "The Wild Forest"
        }

    },
    enemies: {

        rabbit: { nominative: "Rabbit" },
        boar: { nominative: "Boar" },
        deer: { nominative: "Deer" },
        wolf: { nominative: "Wolf" },

    },
    grants: {

        attack: { nominative: "attack" },
        spell: { nominative: "spell" },
        skill: { nominative: "skill" },
        passive: { nominative: "passive effect" },

    },
    effects: {

        // Misc
        mix: verbs => joinEnd(verbs, ", ", " and "),

        // Effects
        damage: amount => ({

            nominative: `${amount} damage`,
            impersonal: `taking ${amount} damage`,
            first: `take ${amount} damage`,
            third: `takes ${amount} damage`,

        }),

    },
    attacks: {

        punch: {
            nominative: "Punch"
        },
        punchSomeone: target => ({

            impersonal: `punching ${target.nominative}`,
            first: `punched ${target.nominative}`,
            third: `punched ${target.nominative}`,

        }),

        bite: {
            nominative: "Bite",
        },
        biteSomeone: target => ({

            impersonal: `biting ${target.nominative}`,
            first: `bit ${target.nominative}`,
            third: `bit ${target.nominative}`,

        }),

    },
    weapons: {

        oldBow: { nominative: "Old bow" }

    },
    busy: doing => `You are currently busy ${doing.impersonal}. End doing it to continue here.`,
    return: doing => `Continue ${doing.impersonal}`

};
export default english;

type EnglishInflection<T = string> = Inflection & {

    impersonal: T
    first: T,
    third: T,

};
