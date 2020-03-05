"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var strategy_route_1 = __importDefault(require("./routes/strategy.route"));
var middlewares_1 = require("./middlewares");
var validate_header_1 = __importDefault(require("../../shared/middlewares/validate-header"));
var header_route_1 = __importDefault(require("./routes/header.route"));
var app = express_1.default();
middlewares_1.configMiddleware(app);
app.use('/config', validate_header_1.default);
app.use('/config', strategy_route_1.default);
app.use('/header', header_route_1.default);
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
exports.default = app;
//# sourceMappingURL=app.js.map