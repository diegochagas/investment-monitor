import express from 'express';
import {configMiddleware} from "./middlewares";
import orderRoute from './routes/order.route';
import bandRoute from "./routes/band.route";
import candleRoute from "./routes/candle.route";

const app = express();
configMiddleware(app);
app.use('/order', orderRoute);
app.use('/band', bandRoute);
app.use('/candle', candleRoute);
export default app;
