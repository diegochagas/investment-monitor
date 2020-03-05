import express from "express";
import accountRoute from "./routes/account.routes";
import {configMiddleware} from "./middlewares";
import secretKeyRoute from "./routes/secret-keys.route";

const app = express();
configMiddleware(app);

app.use('/account', accountRoute);
app.use('/secret-key', secretKeyRoute);

const expressSwagger = require('express-swagger-generator')(app);
export default app;
