import express from 'express';

require('express-async-errors');
import {json} from 'body-parser';
import {currentUserRouter} from "./routes/current-user";
import {signInRouter} from "./routes/signin";
import {signUpRouter} from "./routes/signup";
import {signOutRouter} from "./routes/signout";
import {errorHandler} from "./middlewares/error-handlers";
import {NotFoundError} from "./errors/not-found-error";
import cookieSession from "cookie-session";
import mongoose from 'mongoose';

const app = express();

app.set('trust proxy', true); // Secure traffic
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true // Https connection
    })
)

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});
app.use(errorHandler);

const start = async () => {
    try {
        if (!process.env.JWT_KEY) {
            throw new Error("JWT_KEY must be defined");
        }

        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    } catch (err) {
        console.log(err);
    }

    app.listen(3000, () => {
        console.log("Running on port 3000.");
    });
};

start();
