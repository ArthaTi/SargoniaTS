import Language, { Declension, DeclensionInflection } from "./Language";

type PolishDeclension<T = string> = Declension & {

    /** 1\. Mianownik (kto, co) */
    nominative: T,

    /** 2\. Dopełniacz (kogo, czego) */
    genitive?: T,

    /** 3\. Celownik (komu, czemu) */
    dative?: T,

    /** 4\. Biernik (kogo, co) */
    accusative?: T,

    /** 5\. Narzędnik (z kim, z czym) */
    instrumental?: T,

    /** 6\. Miejscownik (o kim, o czym) */
    locative?: T,

    /** 7\. Wołacz */
    vocative?: T,

};

function declension(word: PolishDeclension): Declension {

    return word;

}

function inflection(word: PolishDeclension & DeclensionInflection): DeclensionInflection {

    return word;

}

const polish: Language = {

    general: {

        notFound: "Ta strona nie istnieje",
        level: "Poziom",
        levelAbbr: "poz.",
        confirmStopping: what => `Czy na pewno chcesz przestać ${what.impersonal}?`,
        cannotStop: what => `Nie możesz przestać ${what.impersonal}!`,

    },
    simple: {

        yes: "Tak",
        no: "Nie",
        stop: "Przestań",
        endItNow: "Zakończ to teraz",
        return: "Wróć",

    },
    character: {

        // Titles
        create: "Utwórz postać",
        name: "Nazwa postaci",
        select: "Wybierz postać",

        // Texts
        levelUp: "Nowy",

        // Attributes
        health: "Zdrowie",
        stamina: "Wytrzymałość",
        mana: "Mana",

        // Errors
        duplicateName: "Ta nazwa postaci jest już zajęta.",
        unnamed: "Nadaj swojej postaci imię, by ją utworzyć.",
        nameLength: "Imię postaci musi mieć od 3 do 20 znaków.",
        invalidName: "Imię postaci musi składać się tylko z angielskich i polskich liter (nie może mieć cyfr ani "
            + "spacji)",
        invalidID: "Postać z tym ID/URL nie istnieje. Może w adresie jest literówka?"

    },
    exploration: {

        declension: inflection({

            nominative: "eksploracja",
            genitive: "eksploracji",
            dative: "eksploracji",
            accusative: "eksplorację",
            instrumental: "eksploracją",
            locative: "eksploracji",
            vocative: "eksploracjo",

            impersonal: "eksplorować",
            singular: {
                first: "eksploruję",
                second: "eksplorujesz",
                third: "eksploruje",
            },
            plural: {
                first: "eksplorujemy",
                second: "eksplorujecie",
                third: "eksplorują",
            }

        }),
        explorationOf: (area: PolishDeclension<string>) => inflection({

            nominative: `eksploracja ${area.genitive}`,
            genitive: `eksploracji ${area.genitive}`,
            dative: `eksploracji ${area.genitive}`,
            accusative: `eksplorację ${area.genitive}`,
            instrumental: `eksploracją ${area.genitive}`,
            locative: `eksploracji ${area.genitive}`,
            vocative: `eksploracjo ${area.genitive}`,

            singular: {

                first: `eksploruję ${area.accusative}`,
                second: `eksplorujesz ${area.accusative}`,
                third: `eksploruje ${area.accusative}`,

            },

            plural: {

                first: `eksplorujemy ${area.accusative}`,
                second: `eksplorujecie ${area.accusative}`,
                third: `eksploruję ${area.accusative}`

            },

            impersonal: `eksplorować ${area.accusative}`,
            noun: `eksplorowanie ${area.accusative}`,

        }),


        // Titles
        title: "Eksploruj",
        areaSelection: "Wybierz teren",

        // Buttons
        continue: "Kontynuuj",
        end: "Zakończ",

        // Exploration ended
        ended: "Eksploracja zakończona!",
        gained: what => `Uzyskałeś ${what.accusative}.`,
        startAnother: "Rozpocznij kolejną",

        // Descriptions
        lobby: "Witaj w poczekalni. Możesz tu poczekać na innych graczy by zaprosić ich do drużyny by eksplorować "
            + "razem. Oczywiście, możesz po prostu to zignorować i kontynuować samotnie.",

        // Errors
        invalidID: "Teren z tym ID/URL nie istnieje. Może w adresie jest literówka?"

    },
    fight: {

        declension: inflection({
            nominative: "walka",
            genitive: "walki",
            dative: "walce",
            accusative: "walkę",
            instrumental: "walką",
            locative: "walce",
            vocative: "walko",

            impersonal: "walczyć",
            singular: {
                first: "walczę",
                second: "walczysz",
                third: "walczy",
            },
            plural: {
                first: "walczymy",
                second: "walczycie",
                third: "walczą",
            }
        }),

        readyCount: (n, outOf) => `${n} z ${outOf} walczących jest gotowych.`,

        // Actions
        wait: "Czekaj na swoją turę",
        imReady: "Jestem gotowy!",
        unready: "Chwila, nie jestem gotowy!",

        // Teams
        yourTeam: declension({
            nominative: "twoja drużyna",
            genitive: "twojej drużyny",
            dative: "twojej drużynie",
            accusative: "twoją drużynę",
            instrumental: "twoją drużyną",
            locative: "twojej drużynie",
            vocative: "twoja drużyno"
        }),
        playerTeam: leader => declension({
            nominative: `drużyna ${leader}`,
            genitive: `drużyny ${leader}`,
            dative: `drużynie ${leader}`,
            accusative: `drużynę ${leader}`,
            instrumental: `drużyną ${leader}`,
            locative: `drużynie ${leader}`,
            vocative: `drużyno ${leader}`,
        }),
        enemyTeam: declension({
            nominative: "przeciwnicy",
            genitive: "przeciwników",
            dative: "przeciwnikom",
            accusative: "przeciwników",
            instrumental: "przeciwnikami",
            locative: "przeciwnikach",
            vocative: "przeciwnicy",
        }),

        // Turns
        turn: (who: PolishDeclension) => declension({
            nominative: `tura ${who.genitive}`,
            genitive: `tury ${who.genitive}`,
            dative: `turze ${who.genitive}`,
            accusative: `turę ${who.genitive}`,
            instrumental: `turą ${who.genitive}`,
            locative: `turze ${who.genitive}`,
            vocative: `turo ${who.genitive}`,
        }),
        yourTurn: declension({
            nominative: "twoja tura",
            genitive: "twojej tury",
            dative: "twojej turze",
            accusative: "twoją turę",
            instrumental: "twoją turą",
            locative: "twojej turze",
            vocative: "twoja turo",
        }),

        // Indicators
        ready: "Gotowy",
        target: "Cel",

    },
    grants: {

        attack: declension({

            nominative: "Atak",
            genitive: "ataku",
            dative: "atakowi",
            accusative: "atak",
            instrumental: "atakiem",
            locative: "ataku",
            vocative: "ataku",

        }),
        skill: declension({

            nominative: "Umiejętność",
            genitive: "umiejętności",
            dative: "umiejętności",
            accusative: "umiejętność",
            instrumental: "umiejętnością",
            locative: "umiejętności",
            vocative: "umiejętności",

        }),
        spell: declension({

            nominative: "Zaklęcie",
            genitive: "zaklęcia",
            dative: "zaklęciu",
            accusative: "zaklęcie",
            instrumental: "zaklęciem",
            locative: "zaklęciu",
            vocative: "zaklęcie",

        }),
        passive: declension({

            nominative: "Pasywny efekt",
            genitive: "pasywnego efektu",
            dative: "pasywnemu efektowi",
            accusative: "pasywny efekt",
            instrumental: "pasywnym efektem",
            locative: "pasywnym efekcie",
            vocative: "pasywny efekcie",

        }),

    },
    weapons: {

        oldBow: declension({
            nominative: "Stary łuk",
            genitive: "starego łuku",
            dative: "staremu łukowi",
            accusative: "stary łuk",
            instrumental: "starym łukiem",
            locative: "starym łuku",
            vocative: "stary łuku"
        })

    },
    areas: {
        wildForest: declension({
            nominative: "Dziki Las",
            genitive: "Dzikiego Lasu",
            dative: "Dzikiemu Lasowi",
            accusative: "Dziki Las",
            instrumental: "Dzikim Lasem",
            locative: "Dzikim Lesie",
            vocative: "Dziki Lesie"
        })
    },
    enemies: {

        // Wild forest
        // They all have the same kind of declension. Perhaps this could be shortened with some function.
        rabbit: declension({
            nominative: "Zając",
            genitive: "zająca",
            dative: "zającowi",
            accusative: "zająca",
            instrumental: "zającem",
            locative: "zającu",
            vocative: "zającu"
        }),
        boar: declension({
            nominative: "Dzik",
            genitive: "dzika",
            dative: "dzikowi",
            accusative: "dzika",
            instrumental: "dzikiem",
            locative: "dziku",
            vocative: "dziku"
        }),
        deer: declension({
            nominative: "Jeleń",
            genitive: "jelenia",
            dative: "jeleniowi",
            accusative: "jelenia",
            instrumental: "jeleniem",
            locative: "jeleniu",
            vocative: "jeleniu",
        }),
        wolf: declension({
            nominative: "Wilk",
            genitive: "wilka",
            dative: "wilkowi",
            accusative: "wilka",
            instrumental: "wilkiem",
            locative: "wilku",
            vocative: "wilku"
        }),

    },
    busy: action => `W tym momencie ${action.singular!.second}. Zakończ to by kontynuować.`,
    return: action => `Kontynuuj ${action.accusative}`,

};

export default polish;
