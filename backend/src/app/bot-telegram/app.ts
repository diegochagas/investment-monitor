import express = require("express");
import {configMiddleware} from "./middlewares";
import eventsTelegramRoute from "./routes/events-telegram.route";
import metricsTelegramRoute from './routes/metrics-telegram.route'
const app = express();
configMiddleware(app);
app.use('/events', eventsTelegramRoute);
app.use('/metrics',metricsTelegramRoute)
export default app;
