import { actions } from "..";
import { url } from "inspector";

actions["characters"] = context => {

    context.title = "Wybierz postać";
    
    context.actions = [
       
        [{ text: "Utwórz postać", url: "/characters/new"}],
    
    ]

};
