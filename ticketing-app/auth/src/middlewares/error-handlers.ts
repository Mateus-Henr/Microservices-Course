import {Request, Response, NextFunction} from 'express';
import RequestValidationError from "../errors/request-validation-error";
import DatabaseConnectionError from "../errors/database-connection-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof RequestValidationError) {
        res.status(err.getStatusCode()).send({
            errors: err.serializeErrors()
        });
    }

    if (err instanceof DatabaseConnectionError) {
        res.status(err.getStatusCode()).send({
            errors: err.serializeErrors()
        });
    }

    res.status(400).send({
        errors: [{message: 'Something went wrong.'}]
    });
};
