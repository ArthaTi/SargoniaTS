import Language, { Declension } from "./Language";

type PolishDeclension<T = string> = {

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

const polish: Language = {

    general: {

        notFound: "Ta strona nie istnieje",
        level: "poziom",
        levelAbbr: "poz.",
        confirmLeaving: dec => `Czy na pewno chcesz opuścić ${dec.accusative}?`,

    },
    simple: {

        leave: "Opuść",
        yes: "Tak",
        no: "Nie"

    },
    character: {

        // Titles
        create: "Utwórz postać",
        name: "Nazwa postaci",
        select: "Wybierz postać",

        // Texts
        levelUp: "Nowy",

        // Errors
        duplicateName: "Ta nazwa postaci jest już zajęta.",
        unnamed: "Nadaj swojej postaci imię, by ją utworzyć.",
        nameLength: "Imię postaci musi mieć od 3 do 20 znaków.",
        invalidName: "Imię postaci musi składać się tylko z angielskich i polskich liter (nie może mieć cyfr ani "
            + "spacji)",
        invalidID: "Postać z tym ID/URL nie istnieje. Może w adresie jest literówka?"

    },
    exploration: {

        declension: <PolishDeclension<string>>{
            nominative: "eksploracja",
            genitive: "eksploracji",
            dative: "eksploracji",
            accusative: "eksplorację",
            instrumental: "eksploracją",
            locative: "eksploracji",
            vocative: "eksploracjo",
        },
        inflection: (area: PolishDeclension<string>) => ({

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

            impersonal: `eksplorować ${area.accusative}`

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

        declension: <PolishDeclension>{
            nominative: "walka",
            genitive: "walki",
            dative: "walce",
            accusative: "walkę",
            instrumental: "walką",
            locative: "walce",
            vocative: "walko",
        },
        inflection: {
            impersonal: "walczyć",
            singular: {
                first: "walczę",
                second: "walczysz",
                third: "walczy"
            },
            plural: {
                first: "walczymy",
                second: "walczycie",
                third: "walczą",
            }
        },

        // Actions
        wait: "Czekaj na swoją turę",

    },
    areas: {
        wildForest: <PolishDeclension>{
            nominative: "Dziki Las",
            genitive: "Dzikiego Lasu",
            dative: "Dzikiemu Lasowi",
            accusative: "Dziki Las",
            instrumental: "Dzikim Lasem",
            locative: "Dzikim Lesie",
            vocative: "Dziki Lesie"
        }
    },
    enemies: {

        // Wild forest
        // They all have the same kind of declension. Perhaps this could be shortened with some function.
        rabbit: <PolishDeclension>{
            nominative: "zając",
            genitive: "zająca",
            dative: "zającowi",
            accusative: "zająca",
            instrumental: "zającem",
            locative: "zającu",
            vocative: "zającu"
        },
        boar: <PolishDeclension>{
            nominative: "dzik",
            genitive: "dzika",
            dative: "dzikowi",
            accusative: "dzika",
            instrumental: "dzikiem",
            locative: "dziku",
            vocative: "dziku"
        },
        deer: <PolishDeclension>{
            nominative: "jeleń",
            genitive: "jelenia",
            dative: "jeleniowi",
            accusative: "jelenia",
            instrumental: "jeleniem",
            locative: "jeleniu",
            vocative: "jeleniu",
        },
        wolf: <PolishDeclension>{
            nominative: "wilk",
            genitive: "wilka",
            dative: "wilkowi",
            accusative: "wilka",
            instrumental: "wilkiem",
            locative: "wilku",
            vocative: "wilku"
        },

    },
    busy: action => `W tym momencie ${action.singular!.second}. Zakończ to by kontynuować.`,
    leave: action => `Przestań ${action.impersonal}`,
    return: action => `Kontynuuj ${action.impersonal}`,

};

export default polish;
