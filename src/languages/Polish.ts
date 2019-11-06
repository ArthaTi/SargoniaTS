import Language from "./Language";

type PolishDeclension<T = () => string> = {

    /** 1. Mianownik (kto, co) */
    nominative: T,

    /** 2. Dopełniacz (kogo, czego) */
    genitive: T,

    /** 3. Celownik (komu, czemu) */
    dative: T,

    /** 4. Biernik (kogo, co) */
    accusative: T,

    /** 5. Narzędnik (z kim, z czym) */
    instrumental: T,

    /** 6. Miejscownik (o kim, o czym) */
    locative: T,

    /** 7. Wołacz */
    vocative: T,

};

const polish: Language = {

    general: {

        notFound: "Ta strona nie istnieje",
        level: "poziom",
        levelAbbr: "poz.",
        invalidActionKey: "Podany klucz akcji jest nieważny lub nieprawidłowy. Może przez pomyłkę w adresie?",
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
    busy: action => `W tym momencie ${action.singular!.second()}. Zakończ to by kontynuować.`,
    leave: action => `Przestań ${action.impersonal}`,
    actions: {

        exploring: area => ({

            singular: {

                first: () => `eksploruję ${area}`,
                second: () => `eksplorujesz ${area}`,
                third: () => `eksploruje ${area}`,

            },

            plural: {

                first: () => `eksplorujemy ${area}`,
                second: () => `eksplorujecie ${area}`,
                third: () => `eksploruję ${area}`

            },

            impersonal: () => `eksplorować ${area}`

        }),

    }

};

export default polish;
