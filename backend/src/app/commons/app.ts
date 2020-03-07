import express from "express";
import {configMiddleware, configRoute} from "./middlewares";
import exchangeRoutes from "./routes/exchange.route";
import profileRoute from "./routes/profile.route";
import instanceRoutes from "./routes/instance.route";
import topicRoutes from "./routes/topic.route";
import botEventsRoutes from "./routes/bot-events.route";
import groupRoutes from "./routes/group.route";
import exchangeAliasRoutes from "./routes/exchange-alias.route";

const app = express();
configMiddleware(app);
configRoute(app);
app.use('/instance', instanceRoutes);

app.use('/bot-events', botEventsRoutes);

app.use('/exchange', exchangeRoutes);
app.use('/exchange-alias', exchangeAliasRoutes);
app.use('/profile', profileRoute);
app.use('/topic', topicRoutes);
app.use('/group', groupRoutes);
const expressSwagger = require('express-swagger-generator')(app);

/*let options = {
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
