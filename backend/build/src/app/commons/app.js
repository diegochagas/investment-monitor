"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("./middlewares");
var exchange_route_1 = __importDefault(require("./routes/exchange.route"));
var profile_route_1 = __importDefault(require("./routes/profile.route"));
var instance_route_1 = __importDefault(require("./routes/instance.route"));
var topic_route_1 = __importDefault(require("./routes/topic.route"));
var bot_events_route_1 = __importDefault(require("./routes/bot-events.route"));
var group_route_1 = __importDefault(require("./routes/group.route"));
var exchange_alias_route_1 = __importDefault(require("./routes/exchange-alias.route"));
var app = express_1.default();
middlewares_1.configMiddleware(app);
middlewares_1.configRoute(app);
app.use('/instance', instance_route_1.default);
app.use('/bot-events', bot_events_route_1.default);
app.use('/exchange', exchange_route_1.default);
app.use('/exchange-alias', exchange_alias_route_1.default);
app.use('/profile', profile_route_1.default);
app.use('/topic', topic_route_1.default);
app.use('/group', group_route_1.default);
var expressSwagger = require('express-swagger-generator')(app);
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
exports.default = app;
//# sourceMappingURL=app.js.map