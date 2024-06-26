import express from "express";
require("express-async-errors");
import {json} from "body-parser";
import {currentUser, errorHandler, NotFoundError} from "@sgtickers-course/test";
import cookieSession from "cookie-session";
import {createTicketRouter} from "./routes/new";
import {showTicketRouter} from "./routes/show";
import {indexTicketRouter} from "./routes";
import {updateTicketRouter} from "./routes/update";

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
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async (req, res) =>
{
    throw new NotFoundError();
});
app.use(errorHandler);

export {app};
