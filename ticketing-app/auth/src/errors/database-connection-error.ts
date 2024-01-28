import {CommonErrorStructure} from "./common-error-structure";

export default class DatabaseConnectionError extends Error implements CommonErrorStructure {
    private statusCode = 500;
    private reason = 'Error connecting to database';

    constructor() {
        super();

        // Because we are using ts, we have to do the following:
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    public serializeErrors(): {}[] {
        return [{message: this.reason}];
    }

    public getStatusCode(): number {
        return this.statusCode;
    }

    public getReason(): string {
        return this.reason;
    }
};
