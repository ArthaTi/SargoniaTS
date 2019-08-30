import { actions } from "..";
import { wrap } from "../utils";

actions["404"] = context => {

    context.content += "Ta strona nie istnieje.";

};
