export function wrap(element: string, ...content: string[]) {

    return `<${element}>${content.join("")}</${element}>`;

}
