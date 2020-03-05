"use strict";
/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var dynamicRoutes_1 = require("../shared/helpers/dynamicRoutes");
exports.configMarketMakerSwagger = function (app, dirname, files) {
    var expressSwaggerMarletMaker = require('express-swagger-generator')(app);
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
            host: "" + (process.env.BASE_URL || 'localhost:3000'),
            basePath: '/market-maker',
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
    var config = expressSwaggerMarletMaker(options);
    dynamicRoutes_1.DynamicRoutes.addConfig(config);
};
//# sourceMappingURL=market-maker-swagger.js.map