import {ValidationError} from 'express-validator';

export default class RequestValidationError extends Error {
    constructor(private errors: ValidationError[]) {
        super();

        // Because we are using ts, we have to do the following:
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    public getErrors(): ValidationError[] {
        return this.errors;
    }
};
