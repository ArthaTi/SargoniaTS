import { actions } from "..";
import { url } from "inspector";

actions["characters"] = context => {
    if (context.url[1] === "new") {
        if (context.method === "POST") {
            //zapis postaci
        } else {
            context.title = "Utwórz postać";
            context.inputs = [{ name: "name", label: "Nazwa postaci" }]
        }
        } else {
            context.title = "Wybierz postać";

            context.actions = [

                [{ text: "Utwórz postać", url: "/characters/new" }],

            ]
        }

    };
