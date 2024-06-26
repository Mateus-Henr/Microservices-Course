import express from "express";
require("express-async-errors");
import {json} from "body-parser";
import {currentUserRouter} from "./routes/current-user";
import {signInRouter} from "./routes/signin";
import {signUpRouter} from "./routes/signup";
import {signOutRouter} from "./routes/signout";
import {errorHandler, NotFoundError} from "@sgtickers-course/test";
import cookieSession from "cookie-session";

const app = express();

app.set("trust proxy", true); // Secure traffic
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test" // Https connection
    })
)

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all("*", async (req, res) =>
{
    throw new NotFoundError();
});
app.use(errorHandler);

export {app};
