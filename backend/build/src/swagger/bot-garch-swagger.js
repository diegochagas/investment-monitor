"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamicRoutes_1 = require("../shared/helpers/dynamicRoutes");
exports.configBotGarchSwagger = function (app, dirname, files) {
    var expressSwaggerBotGarch = require('express-swagger-generator')(app);
    var options = {
        route: {
            url: '/bot-garch/api-docs',
            docs: '/bot-garch/api-docs.json'
        },
        swaggerDefinition: {
            info: {
                description: 'This is a sample server',
                title: 'Bot Garch Monitor  API',
                version: '1.0.0',
            },
            host: "" + (process.env.BASE_URL || 'localhost:3000'),
            basePath: '/bot-garch',
            produces: [
                "application/json",
                "application/xml"
            ],
            schemes: ['http', 'https'],
            securityDefinitions: {
                Bearer: {
                    description: 'Example value:- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM',
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header'
                }
            },
            security: [{ Bearer: [] }],
            defaultSecurity: 'Bearer'
        },
        basedir: dirname,
        files: files //Path to the API handle folder
    };
    var config = expressSwaggerBotGarch(options);
    dynamicRoutes_1.DynamicRoutes.addConfig(config);
};
//# sourceMappingURL=bot-garch-swagger.js.map