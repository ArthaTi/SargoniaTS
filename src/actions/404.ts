import { actions } from "..";

actions["404"] = context => {

    context.text += "Ta strona nie istnieje.";

};
