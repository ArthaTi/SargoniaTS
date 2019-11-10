export default class ArrayProxy<T> extends Array<T> {

    /**
     * All functions inside will be called when a new fighter is added to the team.
     */
    onAdded: ((f: T) => void)[] = [];

    /**
     * All functions inside will be called when a fighter is removed from the team.
     *
     * Note: if a fighter is moved, both this and `onAdded` will be called.
     */
    onRemoved: ((f: T) => void)[] = [];

    constructor(count: number);
    constructor(...items: T[]);
    constructor(...items: (number | T)[]) {

        // @ts-ignore ...items is literally the signature of super(). What the hell.
        super(...items);

        // Create the array
        return new Proxy(this, {

            set: (target, property: keyof T[], value: any) => {

                /** Previous fighter in the position */
                let prev = target[property] as T;

                // Set the thing
                target[property] = value;

                // Ignore non-numeric items
                if (typeof property !== "number") return true;

                // If there was a fighter in this position
                if (prev) {

                    // Call the remove events
                    this.onRemoved.forEach(func => func(prev));

                }

                // Call the add event
                this.onAdded.forEach(func => func(value));

                return true;

            },

            deleteProperty: (target, property: keyof T[]) => {

                // Ignore non-numeric items
                if (typeof property !== "number") return true;

                // Call event
                this.onRemoved.forEach(func => func(target[property]));

                return true;

            },

        });

    }

}
