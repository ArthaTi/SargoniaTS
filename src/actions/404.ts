import { actions } from "..";

actions["404"] = context => {

    context.content += "Ta strona nie istnieje.";

};
