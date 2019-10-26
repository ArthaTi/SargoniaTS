import Language, { PersonInflection } from "./languages/Language";
import Context from "./Context";

export default abstract class Event {

    /**
     * Status text of the playing player.
     */
    abstract status: (context: Language) => PersonInflection<() => string>;

    /**
     * If exists, the character can leave the event. This function will be executed before.
     */
    abstract leave?: (context: Context) => void;

}
