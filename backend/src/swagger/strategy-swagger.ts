import {DynamicRoutes} from "../shared/helpers/dynamicRoutes";

export const configStrategySwagger = (app: any, dirname: string, files: string[]) => {
    const expressSwaggerSubscriber = require('express-swagger-generator')(app);
    let options = {
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
            host: `${process.env.BASE_URL || 'localhost:3000'}`,
            basePath: '/strategy',
            produces: [
                "application/json",
                "application/xml"
            ],
            consumes:[
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
        basedir: dirname, //app absolute path
        files//Path to the API handle folder
    };
    const config = expressSwaggerSubscriber(options);
    DynamicRoutes.addConfig(config);
}
