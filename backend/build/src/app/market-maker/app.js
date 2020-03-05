"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var order_route_1 = __importDefault(require("./routes/order.route"));
var middlewares_1 = require("./middlewares");
var liquidate_route_1 = __importDefault(require("./routes/liquidate.route"));
var app = express_1.default();
// connectToMarketMakerDB();
middlewares_1.configMiddleware(app);
app.use('/order', order_route_1.default);
app.use('/liquidate', liquidate_route_1.default);
var expressSwagger = require('express-swagger-generator')(app);
var options = {
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
        host: (process.env.BASE_URL || 'localhost') + ":" + (process.env.PORT || 3000),
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
    basedir: __dirname,
    files: ['./**/*.js'] //Path to the API handle folder
};
// expressSwagger(options);
exports.default = app;
//# sourceMappingURL=app.js.map