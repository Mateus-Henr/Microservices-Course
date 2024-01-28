import express from 'express';
import {json} from 'body-parser';
import {currentUserRouter} from "./routes/current-user";
import {signInRouter} from "./routes/signin";
import {signUpRouter} from "./routes/signup";
import {signOutRouter} from "./routes/signout";
import {errorHandler} from "./middlewares/error-handlers";
import {NotFoundError} from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all('*', () => {
    throw new NotFoundError();
});
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Running on port 3000.");
});
