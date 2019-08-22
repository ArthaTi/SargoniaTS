import { actions } from "..";
import { wrap } from "../utils";

actions[""] = context => {

    context.content += wrap("p", "Witaj w Sargonii!");

};
