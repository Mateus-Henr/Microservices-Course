import express from "express";
import {json} from "body-parser";
import {currentUser, errorHandler, NotFoundError} from "@sgtickers-course/common";
import cookieSession from "cookie-session";
import {deleteOrderRouter} from "./routes/delete";
import {showOrderRouter} from "./routes/show";
import {newOrderRouter} from "./routes/new";
import {indexOrderRouter} from "./routes";

require("express-async-errors");

const app = express();

app.set("trust proxy", true); // Secure traffic
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test" // Https connection
    })
)
app.use(currentUser);
app.use(deleteOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);
app.use(indexOrderRouter);

app.all("*", async (req, res) =>
{
    throw new NotFoundError();
});
app.use(errorHandler);

export {app};
