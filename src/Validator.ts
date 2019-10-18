import Language from "./languages/Language";
import Context from "./Context";

export type Validator<T = any> = (item: T) => boolean;
export type Translator = (lang: Language) => string;

const validators: { [cls: string]: { [name: string]: [Validator, Translator][] } } = {};

export default function requirement<T>(validator: Validator<T>, message: Translator) {

    return function (object: any, property: string) {

        // Get the validator for the class
        let clsValidator = validators[object.constructor.name] || (validators[object.constructor.name] = {});

        // If any validator for the property exists
        if (clsValidator[property] instanceof Array) {

            // Add this one
            // Also, because decorators are stupid AF – keep this in proper order
            clsValidator[property].unshift([validator, message]);

        } else {

            // Create the first one
            clsValidator[property] = [[validator, message]];

        }

    };

}

export function validate(context: Context, obj: any) {

    // Get the class validator
    let clsValidator = validators[obj.constructor.name];

    // Validate each property
    for (let property in clsValidator) {

        // Get the value in object
        let value = obj[property];

        // For each validator
        for (let validator of clsValidator[property]) {

            // Perform the validation
            if (!validator[0](value)) {

                // Show an error on fail
                context.error = validator[1](context.language);

                // Stop the function
                return false;

            }

        }

    }

    return true;

}
