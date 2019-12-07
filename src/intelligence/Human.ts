import Intelligence from "./Intelligence";

export default class HumanIntel extends Intelligence {

    joined() { }

    turn(): Promise<void> {

        // Do not await!
        return new Promise(resolve => resolve());

    }

}
