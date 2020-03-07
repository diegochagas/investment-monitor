/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
*/

import {DynamicRoutes} from "../shared/helpers/dynamicRoutes";

export const configMarketMakerSwagger = (app: any, dirname: string, files: string[]) => {
    const expressSwaggerMarletMaker = require('express-swagger-generator')(app);
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
            host: `${process.env.BASE_URL || 'localhost:3000'}`,
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
        basedir: dirname, //app absolute path
        files//Path to the API handle folder
    };
    const config = expressSwaggerMarletMaker(options);
    DynamicRoutes.addConfig(config);
};
