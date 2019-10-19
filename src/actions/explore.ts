import { actions } from "..";
import checkContext, { requireCharacter } from "../checks";

actions["explore"] = checkContext(requireCharacter, async context => {

});
