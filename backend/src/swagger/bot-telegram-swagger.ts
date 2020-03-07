import {DynamicRoutes} from "../shared/helpers/dynamicRoutes";

export const configBotTelegramSwagger = (app: any, dirname: string, files: string[]) => {
    const expressSwaggerBotTelegram = require('express-swagger-generator')(app);
    let options = {
        route: {
            url: '/bot-telegram/api-docs',
            docs: '/bot-telegram/api-docs.json'
        },
        swaggerDefinition: {
            info: {
                description: 'This is a sample server',
                title: 'Bot Telegram Monitor  API',
                version: '1.0.0',
            },
            host: `${process.env.BASE_URL || 'localhost:3000'}`,
            basePath: '/bot-telegram',
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
            security: [{Bearer: []}],
            defaultSecurity: 'Bearer'
        },
        basedir: dirname, //app absolute path
        files//Path to the API handle folder
    };
    const config = expressSwaggerBotTelegram(options);
    DynamicRoutes.addConfig(config);
};
