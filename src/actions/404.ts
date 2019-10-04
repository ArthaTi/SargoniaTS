import { actions } from "..";

actions["404"] = context => {

    context.error = "Ta strona nie istnieje.";

};
