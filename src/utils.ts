/**
 * Void elements in HTML. This list incomplete to improve performance, add new items if needed.
 */
const voidElements = ["br", "hr", "link", "meta"];

/**
 * Wrap the content in a XHTML5 element.
 */
export function wrap(element: string): string;
export function wrap(element: string, ...content: string[]): string;
export function wrap(element: string, attributes: { [attr: string]: string }, ...content: string[]): string;
export function wrap(element: string, attributes?: string | { [attr: string]: string }, ...content: string[]) {

    let attrs = "";

    if (typeof attributes === "object") {
        // Encode attributes
        for (let attr in attributes) {

            // Get its content
            let content = attributes[attr];

            attrs += ` ${attr}="${escapeHTML(content)}"`;

        }

    }

    // It's a string
    else if (typeof attributes === "string") {

        // Add it to content
        content.unshift(attributes);

    }

    // If it's a void element
    return voidElements.includes(element)
        ? `<${element}${attrs} />`
        : `<${element}${attrs}>${content.join("")}</${element}>`;


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
