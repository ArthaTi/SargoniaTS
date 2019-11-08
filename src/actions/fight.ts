import { actions } from "..";
import checkContext, { exclusiveEvent } from "../checks";
import FightEvent from "../events/FightEvent";
import { InternalRedirect } from "../exceptions";

actions["fight"] = checkContext(exclusiveEvent(FightEvent), context => {

    // No one's fighting there
    if (!context.user.currentCharacter.event) {

        throw new InternalRedirect("/", context);

    }

    //

});
