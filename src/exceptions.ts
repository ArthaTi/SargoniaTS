import Context from "./Context";

export class RequestError extends Error {

    constructor(public code: number, message?: string) {

        super(message);

    }

}

export class Redirect extends RequestError {

    constructor(public target: string) {

        super(302);

    }

}

export class InternalRedirect extends Redirect {

    constructor(public action: string, public context: Context) {

        super(`/${action}/` + context.url.slice(1).join("/"));

    }

}
