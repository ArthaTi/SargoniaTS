import { actions } from "..";
import { wrap } from "../utils";

actions["404"] = context => {

    context.content += wrap("p", "Ta strona nie istnieje.");

};
