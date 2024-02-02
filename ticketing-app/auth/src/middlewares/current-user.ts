import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
    id: string;
    email: string;
}

// Making modifications to existing type definitions.
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) { // Checks if the internal property exists.
        return next();
    }

    try {
        // Checks if the JWT has been modified or if it's no longer valid.
        req.currentUser = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    } catch (err) {
    }

    next();
};
