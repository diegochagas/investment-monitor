import express from 'express';
import {configMiddleware} from "./middlewares";
import csvOrderRoute from "./routes/csv-order.route";
import userRoute from "./routes/user.route";

const app = express();
configMiddleware(app);
app.use('/csv-order', csvOrderRoute);
app.use('/user', userRoute);
export default app;
