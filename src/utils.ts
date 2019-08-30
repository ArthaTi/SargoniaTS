/**
 * Void elements in HTML. This list incomplete to improve performance, add new items if needed.
 */
const voidElements = ["br", "hr", "link", "meta"];

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
