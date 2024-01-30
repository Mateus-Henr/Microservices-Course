import {CustomError} from "./custom-error";

export class BadRequestError extends CustomError {
    protected statusCode = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    public serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: this.message}];
    }

    public getStatusCode(): number {
        return this.statusCode;
    }

}
