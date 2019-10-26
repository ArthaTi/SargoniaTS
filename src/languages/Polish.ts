import Language from "./Language";

const polish: Language = {

    general: {

        notFound: "Ta strona nie istnieje",
        level: "poziom",
        levelAbbr: "poz.",

    },
    character: {

        // Titles
        create: "Utwórz postać",
        name: "Nazwa postaci",
        select: "Wybierz postać",

        // Errors
        duplicateName: "Ta nazwa postaci jest już zajęta.",
        unnamed: "Nadaj swojej postaci imię, by ją utworzyć.",
        nameLength: "Imię postaci musi mieć od 3 do 20 znaków.",
        invalidName: "Imię postaci musi składać się tylko z angielskich i polskich liter (nie może mieć cyfr ani "
            + "spacji)",
        invalidID: "Postać z tym ID/URL nie istnieje. Może w adresie jest literówka?"

    },
    area: {

        // Titles
        selection: "Wybierz teren",

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
