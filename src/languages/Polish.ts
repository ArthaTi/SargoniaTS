import Language, { Declension, Inflection, joinEnd } from "./Language";

// TODO: add a female inflection for singular third person

const polish: Language<PolishDeclension, Required<Inflection>> = {

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

        // Abilities
        strength: "Siła",
        intelligence: "Inteligencja",
        dexterity: "Zwinność",
        perception: "Percepcja",
        charisma: "Charyzma",

        // Errors
        duplicateName: "Ta nazwa postaci jest już zajęta.",
        unnamed: "Nadaj swojej postaci imię, by ją utworzyć.",
        nameLength: "Imię postaci musi mieć od 3 do 20 znaków.",
        invalidName: "Imię postaci musi składać się tylko z angielskich i polskich liter (nie może mieć cyfr ani "
            + "spacji)",
        invalidID: "Postać z tym ID/URL nie istnieje. Może w adresie jest literówka?"

    },
    exploration: {

        declension: {

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

        },
        explorationOf: (area: PolishDeclension<string>) => ({

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

        declension: {
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
        },

        readyCount: (n, outOf) => `${n} z ${outOf} walczących jest gotowych.`,

        // Actions
        wait: "Czekaj na swoją turę",
        imReady: "Jestem gotowy!",
        unready: "Chwila, nie jestem gotowy!",

        // Teams
        yourTeam: {
            nominative: "twoja drużyna",
            genitive: "twojej drużyny",
            dative: "twojej drużynie",
            accusative: "twoją drużynę",
            instrumental: "twoją drużyną",
            locative: "twojej drużynie",
            vocative: "twoja drużyno"
        },
        playerTeam: leader => ({
            nominative: `drużyna ${leader}`,
            genitive: `drużyny ${leader}`,
            dative: `drużynie ${leader}`,
            accusative: `drużynę ${leader}`,
            instrumental: `drużyną ${leader}`,
            locative: `drużynie ${leader}`,
            vocative: `drużyno ${leader}`,
        }),
        enemyTeam: {
            nominative: "przeciwnicy",
            genitive: "przeciwników",
            dative: "przeciwnikom",
            accusative: "przeciwników",
            instrumental: "przeciwnikami",
            locative: "przeciwnikach",
            vocative: "przeciwnicy",
        },

        // Turns
        turn: (who: PolishDeclension) => ({
            nominative: `tura ${who.genitive}`,
            genitive: `tury ${who.genitive}`,
            dative: `turze ${who.genitive}`,
            accusative: `turę ${who.genitive}`,
            instrumental: `turą ${who.genitive}`,
            locative: `turze ${who.genitive}`,
            vocative: `turo ${who.genitive}`,
        }),
        yourTurn: {
            nominative: "twoja tura",
            genitive: "twojej tury",
            dative: "twojej turze",
            accusative: "twoją turę",
            instrumental: "twoją turą",
            locative: "twojej turze",
            vocative: "twoja turo",
        },

        // Actions
        didSomething: (who, what) => `${who.nominative} ${what.singular.third}.`,
        youDidSomething: (what) => `${what.singular.second}.`,

        // Indicators
        ready: "Gotowy",
        target: "Cel",

    },
    grants: {

        attack: {

            nominative: "Atak",
            genitive: "ataku",
            dative: "atakowi",
            accusative: "atak",
            instrumental: "atakiem",
            locative: "ataku",
            vocative: "ataku",

        },
        skill: {

            nominative: "Umiejętność",
            genitive: "umiejętności",
            dative: "umiejętności",
            accusative: "umiejętność",
            instrumental: "umiejętnością",
            locative: "umiejętności",
            vocative: "umiejętności",

        },
        spell: {

            nominative: "Zaklęcie",
            genitive: "zaklęcia",
            dative: "zaklęciu",
            accusative: "zaklęcie",
            instrumental: "zaklęciem",
            locative: "zaklęciu",
            vocative: "zaklęcie",

        },
        passive: {

            nominative: "Pasywny efekt",
            genitive: "pasywnego efektu",
            dative: "pasywnemu efektowi",
            accusative: "pasywny efekt",
            instrumental: "pasywnym efektem",
            locative: "pasywnym efekcie",
            vocative: "pasywny efekcie",

        },

    },
    effects: {

        // Misc
        mix: verbs => joinEnd(verbs, ", ", " i "),

        // Effects
        damage: amount => ({

            // We'd need to know the amount of damage to provide an always-correct declension.
            // Simply, we just use an abbreviation instead of the normal noun.
            nominative: `${amount} pkt obrażeń`,
            genitive: `${amount} pkt obrażeń`,
            dative: `${amount} pkt obrażeń`,
            accusative: `${amount} pkt obrażeń`,
            instrumental: `${amount} pkt obrażeń`,
            locative: `${amount} pkt obrażeń`,
            vocative: `${amount} pkt obrażeń`,

            impersonal: `otrzymać ${amount} pkt obrażeń`,
            singular: {
                first: `otrzymałem ${amount} pkt obrażeń`,
                second: `otrzymałeś ${amount} pkt obrażeń`,
                third: `otrzymał ${amount} pkt obrażeń`,
            },
            plural: {
                first: `otrzymaliśmy ${amount} pkt obrażeń`,
                second: `otrzymaliście ${amount} pkt obrażeń`,
                third: `otrzymali ${amount} pkt obrażeń`,
            },

        }),

    },
    attacks: {

        // Punch
        punch: {

            nominative: "Cios",
            genitive: "ciosu",
            dative: "ciosowi",
            accusative: "cios",
            instrumental: "ciosem",
            locative: "ciosie",
            vocative: "ciosie"

        },
        punchSomeone: target => ({

            impersonal: `walnąć ${target.genitive}`,
            singular: {
                first: `walnąłem ${target.genitive}`,
                second: `walnąłeś ${target.genitive}`,
                third: `walnął ${target.genitive}`,
            },
            plural: {
                first: `walnęliśmy ${target.genitive}`,
                second: `walnęliście ${target.genitive}`,
                third: `walnęli ${target.genitive}`,
            }

        }),

        // Bite
        bite: {

            nominative: "Ugryzienie",
            genitive: "ugryzienia",
            dative: "ugryzieniu",
            accusative: "ugryzienie",
            instrumental: "ugryzieniem",
            locative: "ugryzieniu",
            vocative: "ugryzieniu",

        },
        biteSomeone: target => ({

            impersonal: `ugryźć ${target.genitive}`,
            singular: {
                first: `ugryzłem ${target.genitive}`,
                second: `ugryzłeś ${target.genitive}`,
                third: `ugryzł ${target.genitive}`,
            },
            plural: {
                first: `ugryźliśmy ${target.genitive}`,
                second: `ugryźliście ${target.genitive}`,
                third: `ugryźli ${target.genitive}`
            },

        }),

    },
    weapons: {

        oldBow: {
            nominative: "Stary łuk",
            genitive: "starego łuku",
            dative: "staremu łukowi",
            accusative: "stary łuk",
            instrumental: "starym łukiem",
            locative: "starym łuku",
            vocative: "stary łuku"
        }

    },
    areas: {
        wildForest: {
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
        rabbit: {
            nominative: "Zając",
            genitive: "zająca",
            dative: "zającowi",
            accusative: "zająca",
            instrumental: "zającem",
            locative: "zającu",
            vocative: "zającu"
        },
        boar: {
            nominative: "Dzik",
            genitive: "dzika",
            dative: "dzikowi",
            accusative: "dzika",
            instrumental: "dzikiem",
            locative: "dziku",
            vocative: "dziku"
        },
        deer: {
            nominative: "Jeleń",
            genitive: "jelenia",
            dative: "jeleniowi",
            accusative: "jelenia",
            instrumental: "jeleniem",
            locative: "jeleniu",
            vocative: "jeleniu",
        },
        wolf: {
            nominative: "Wilk",
            genitive: "wilka",
            dative: "wilkowi",
            accusative: "wilka",
            instrumental: "wilkiem",
            locative: "wilku",
            vocative: "wilku"
        },

    },
    busy: action => `W tym momencie ${action.singular.second}. Zakończ to by kontynuować.`,
    return: action => `Kontynuuj ${action.accusative}`,

};

type PolishDeclension<T = string> = Declension<T> & {

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

export default polish;
