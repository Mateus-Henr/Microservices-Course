import {ValidationError} from 'express-validator';
import {CommonErrorStructure} from "./common-error-structure";

export default class RequestValidationError extends Error implements CommonErrorStructure {
    private statusCode = 400;

    constructor(private errors: ValidationError[]) {
        super();

        // Because we are using ts, we have to do the following:
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    public serializeErrors() {
        return [
            this.errors.map(error => {
                if (error.type === 'field') {

                    return {message: error.msg, field: error.path};
                }
            })
        ];
    }

    public getStatusCode(): number {
        return this.statusCode;
    }

    public getErrors(): ValidationError[] {
        return this.errors;
    }
};
