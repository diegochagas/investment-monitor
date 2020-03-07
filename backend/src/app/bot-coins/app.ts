import {configMiddleware} from "./middlewares";
import express from 'express'
import executedStrategiesRoute from "./routes/executed-strategies.route";
import balanceRoute from "./routes/balance.route";

const app = express();
configMiddleware(app);
app.use('/executed-strategies', executedStrategiesRoute);
app.use('/balance', balanceRoute);
export default app;
