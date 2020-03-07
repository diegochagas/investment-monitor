import express from "express";
import orderRoutes from "./routes/order.route";

import {configMiddleware} from "./middlewares";
import liquidateRoute from "./routes/liquidate.route";

const app = express();
// connectToMarketMakerDB();
configMiddleware(app);
app.use('/order', orderRoutes);
app.use('/liquidate', liquidateRoute);
const expressSwagger = require('express-swagger-generator')(app);

let options = {
    route: {
        url: '/market-maker/api-docs',
        docs: '/market-maker/api-docs.json'
    },
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Market Maker Monitor  API',
            version: '1.0.0',
        },
        host: `${process.env.BASE_URL || 'localhost'}:${process.env.PORT || 3000}`,
        basePath: '/market-maker',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
           /* JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }*/
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./**/*.js'] //Path to the API handle folder
};
// expressSwagger(options);


export default app;
