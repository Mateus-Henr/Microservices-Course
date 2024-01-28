import {ValidationError} from 'express-validator';
import {CustomError} from "./custom-error";

export default class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(private errors: ValidationError[]) {
        super('Invalid request parameters');

        // Because we are using ts, we have to do the following:
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    public serializeErrors() {
        return this.errors.map(error => {
            if (error.type === 'field') {

                return {message: error.msg, field: error.path};
            }

            return {message: error.msg};
        });
    }

    public getStatusCode(): number {
        return this.statusCode;
    }

    public getErrors(): ValidationError[] {
        return this.errors;
    }
};
