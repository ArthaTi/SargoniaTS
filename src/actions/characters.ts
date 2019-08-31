import { actions } from "..";
import { url } from "inspector";

actions["characters"] = context => {
    if (context.url[1] === "new") {
        context.title = "Utwórz postać";
        context.inputs = []
    }
    else {
        context.title = "Wybierz postać";

        context.actions = [

            [{ text: "Utwórz postać", url: "/characters/new" }],

        ]
    }

};
