import { actions } from "..";

actions["404"] = context => {

    context.error = context.language.general.notFound;

};
