import {CustomError} from "./custom-error";

export default class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    private reason = 'Error connecting to database';

    constructor() {
        super('Error connecting to database');

        // Because we are using ts, we have to do the following:
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    public serializeErrors() {
        return [{message: this.reason}];
    }

    public getStatusCode(): number {
        return this.statusCode;
    }

    public getReason(): string {
        return this.reason;
    }
};
