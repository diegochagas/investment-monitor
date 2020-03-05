"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamicRoutes_1 = require("../shared/helpers/dynamicRoutes");
exports.configStrategySwagger = function (app, dirname, files) {
    var expressSwaggerSubscriber = require('express-swagger-generator')(app);
    var options = {
        route: {
            url: '/strategy/api-docs',
            docs: '/strategy/api-docs.json'
        },
        swaggerDefinition: {
            info: {
                description: 'This is a sample server',
                title: 'Strategy  API',
                version: '1.0.0',
                isShared: true
            },
            host: "" + (process.env.BASE_URL || 'localhost:3000'),
            basePath: '/strategy',
            produces: [
                "application/json",
                "application/xml"
            ],
            consumes: [
                "application/octet-stream"
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
//# sourceMappingURL=strategy-swagger.js.map