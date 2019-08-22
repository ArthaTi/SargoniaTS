import { actions } from "..";

actions["404"] = (_request, response) => {

    response.write("Ta strona nie istnieje.");

};
