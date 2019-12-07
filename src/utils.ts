/**
 * Void elements in HTML. This list incomplete to improve performance, add new items if needed.
 */
const voidElements = ["br", "hr", "link", "meta", "input"];

type HtmlContent = string | string[] | void;
type DynamicHtmlContent = HtmlContent | ((arr: string[]) => HtmlContent);

/**
 * Wrap the content in a XHTML5 element.
 *
 * @param content a string (you can add the result of wrap()), a list of strings, or a function to return a string
 * or list of strings. It is also given an empty array, so it can easily push to it and all items will automatically
 * added to the content.
 */
export function wrap(element: string): string;
export function wrap(element: string, ...content: DynamicHtmlContent[]): string;
export function wrap(
    element: string, attributes: { [attr: string]: string | undefined }, ...content: DynamicHtmlContent[]
): string;
export function wrap(
    element: string, attributes?: DynamicHtmlContent | { [attr: string]: string | undefined },
    ...content: DynamicHtmlContent[]
) {

    let attrs = "";

    // If given attributes
    if (typeof attributes === "object" && !(attributes instanceof Array)) {

        // Encode attributes
        for (let attr in attributes) {

            // Get its content
            let content = attributes[attr];

            // Skip undefined
            if (content === undefined) continue;

            attrs += ` ${attr}="${escapeHTML(content)}"`;

        }

    }

    // It's a content item
    else {

        // Add it to content
        content.unshift(attributes);

    }

    let text = "";

    // Read content
    for (let item of content) {

        const addContent = (item: DynamicHtmlContent) => {

            // If it's a string
            if (typeof item === "string") {

                // Add it to the text
                text += item;

            }

            // It's an array
            else if (item instanceof Array) {

                // Join the items
                text += item.join("");

            }

            // It's null or undefined
            else if (!item) {

                // Skip it
                return;

            }

            // It's a function
            else {

                let arr: string[] = [];

                // Add its result
                addContent(item(arr));

                // Add the array too
                addContent(arr);

            }

        };

        addContent(item);

    }

    // If it's a void element
    return voidElements.includes(element)
        ? `<${element}${attrs} />`
        : `<${element}${attrs}>${text}</${element}>`;


}

/**
 * Escape HTML.
 */
export function escapeHTML(str: string) {
    return str.replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

/**
 * Get a random number in range [n, m] or [0, n).
 *
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Examples
 */
export function randomRange(range: [number, number] | Range): number;
export function randomRange(min: number, max: number): number;
export function randomRange(max: number): number;
export function randomRange(min: number | [number, number] | Range, max?: number) {

    // Given an array
    if (min instanceof Array) {

        // Store in the parameters (Note: `= min` won't work!)
        [min, max] = [min[0], min[1]];

    }

    // Maximum range not given
    else if (max === undefined) {
        max = min - 1;
        min = 0;
    }

    // Round the values
    min = Math.ceil(min);
    max = Math.floor(max);

    // Get the value
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get first yielded element of the iterator.
 */
export function getFirst<T>(iterator: IterableIterator<T>, filter?: (item: T) => boolean): T | undefined {

    // Iterate on the iterator
    for (let item of iterator) {

        // Filter
        if (!filter?.(item)) continue;

        // Return the item
        return item;

    }

}

export class Range extends Array<number> {

    length!: 2;
    0: number;
    1: number;

    constructor(min: number, max?: number) {

        // Maximum range not given
        if (max === undefined) {

            // Make it [0-min) range instead
            max = min - 1;
            min = 0;

        }

        super(min, max);

    }

    toString() {

        // Get the range
        let min = Math.ceil(this[0]);
        let max = Math.floor(this[1]);

        // A constant value, convert to string
        if (min === max) return min.toString();

        // Two values, get the range
        return `${min}-${max}`;

    }

    *[Symbol.iterator]() {

        for (let i = this[0]; i < this[1]; i++) {

            yield i;

        }

    }

}
