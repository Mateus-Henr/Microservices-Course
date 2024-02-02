import {CustomError} from "./custom-error";

export class NotAuthorizedError extends CustomError {
    protected statusCode = 401;

    constructor() {
        super('Not authorized');

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    public serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: 'Not authorized'}];
    }

    public getStatusCode(): number {
        return this.statusCode;
    }

}
