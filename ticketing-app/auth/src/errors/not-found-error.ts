import {CustomError} from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Route not found');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    public serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: 'Not Found'}];
    }

    public getStatusCode(): number {
        return this.statusCode;
    }
}
