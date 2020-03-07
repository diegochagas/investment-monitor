import express from "express";
import strategyRoutes from "./routes/strategy.route";
import {configMiddleware} from "./middlewares";
import validateHeader from "../../shared/middlewares/validate-header";
import headerRoutes from "./routes/header.route";

const app = express();
configMiddleware(app);
app.use('/config', validateHeader);
app.use('/config', strategyRoutes);
app.use('/header', headerRoutes);
/*const expressSwagger = require('express-swagger-generator')(app);
let options = {
    route: {
        url: '/garch/api-docs',
        docs: '/garch/api-docs.json'
    },
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Garch  API',
            version: '1.0.0',
        },
        host: `${process.env.BASE_URL || 'localhost'}:${process.env.PORT || 3000}`,
        basePath: '/garch',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
           /!* JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }*!/
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./!**!/!*.js'] //Path to the API handle folder
};*/
// expressSwagger(options);


export default app;
