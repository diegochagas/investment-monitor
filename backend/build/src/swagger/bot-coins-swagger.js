"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamicRoutes_1 = require("../shared/helpers/dynamicRoutes");
exports.configBotCoinsSwagger = function (app, dirname, files) {
    var expressSwaggerSubscriber = require('express-swagger-generator')(app);
    var options = {
        route: {
            url: '/bot-coins/api-docs',
            docs: '/bot-coins/api-docs.json'
        },
        swaggerDefinition: {
            info: {
                description: 'This is a sample server',
                title: 'BotCoins  API',
                version: '1.0.0',
            },
            host: "" + (process.env.BASE_URL || 'localhost:3000'),
            basePath: '/bot-coins',
            produces: [
                "application/json",
                "application/xml"
            ],
            schemes: ['http', 'https'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: "",
                }
            }
        },
        basedir: dirname,
        files: files //Path to the API handle folder
    };
    var config = expressSwaggerSubscriber(options);
    dynamicRoutes_1.DynamicRoutes.addConfig(config);
};
//# sourceMappingURL=bot-coins-swagger.js.map