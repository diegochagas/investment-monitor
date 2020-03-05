"use strict";
/*
* Copyright (C) Atlas Project LLC
* All Rights Reserved.
*
* Unauthorized copying of this file, via any medium is strictly prohibited.
*
* Proprietary and confidential.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var exchanger_manager_swagger_1 = require("./swagger/exchanger-manager-swagger");
if (process.env.NODE_ENV && process.env.NODE_ENV === 'local') {
    console.log('Loading .env file on start application');
    require('dotenv').config();
}
var bot_coins_swagger_1 = require("./swagger/bot-coins-swagger");
var bot_telegram_swagger_1 = require("./swagger/bot-telegram-swagger");
var bot_garch_swagger_1 = require("./swagger/bot-garch-swagger");
var market_maker_swagger_1 = require("./swagger/market-maker-swagger");
var strategy_swagger_1 = require("./swagger/strategy-swagger");
var common_swagger_1 = require("./swagger/common-swagger");
var app_server_1 = require("./infra/app-server");
var app_1 = __importDefault(require("./app/market-maker/app"));
var app_2 = __importDefault(require("./app/strategy/app"));
var app_3 = __importDefault(require("./app/commons/app"));
var app_4 = __importDefault(require("./app/bot-garch/app"));
var app_5 = __importDefault(require("./app/bot-coins/app"));
var app_6 = __importDefault(require("./app/bot-telegram/app"));
var app_7 = __importDefault(require("./app/exchange-manager/app"));
var app_8 = __importDefault(require("./app/evo-manager/app"));
var morgan_logger_config_1 = require("./shared/helpers/morgan-logger-config");
var morgan_1 = __importDefault(require("./shared/middlewares/morgan"));
var winston_1 = __importDefault(require("./shared/middlewares/winston"));
var morgan_body_1 = __importDefault(require("morgan-body"));
var app = new app_server_1.AppServer().getApp();
app.use(morgan_1.default(morgan_logger_config_1.morganConfigRequestHeader, { stream: winston_1.default.stream }));
app.use(morgan_1.default(morgan_logger_config_1.morganConfigRequestBody, { stream: winston_1.default.stream }));
morgan_body_1.default(app, {
    stream: winston_1.default.stream,
});
app.use('/market-maker', app_1.default);
app.use('/strategy', app_2.default);
app.use('/general-system', app_3.default);
app.use('/bot-garch', app_4.default);
app.use('/bot-coins', app_5.default);
app.use('/bot-telegram', app_6.default);
app.use('/exchange-manager', app_7.default);
app.use('/evo-manager', app_8.default);
app.get('/', function (req, res) {
    var baseUrl = "http://" + req.get('host') + req.originalUrl;
    res.send("\n        <html> \n            <head>\n                <title> Swaggers </title>\n            </head>\n            <body>\n                <ul>\n                    <li><a href=" + baseUrl + "market-maker/api-docs target=\"_blank\">Market Maker<a></li>\n                    <li><a href=" + baseUrl + "bot-garch/api-docs target=\"_blank\">Bot Garch</a></li>\n                    <li><a href=" + baseUrl + "bot-telegram/api-docs target=\"_blank\">Bot Telegram</a></li>\n                    <li><a href=" + baseUrl + "general-system/api-docs target=\"_blank\">General System</a></li>\n                    <li><a href=" + baseUrl + "strategy/api-docs target=\"_blank\">Strategy</a></li>\n                    <li><a href=" + baseUrl + "bot-coins/api-docs target=\"_blank\">Bot Coins</a></li>\n                    <li><a href=" + baseUrl + "exchange-manager/api-docs target=\"_blank\">Exchange Manager</a></li>\n                </ul>\n            </body>\n        </html>\n    ");
});
bot_coins_swagger_1.configBotCoinsSwagger(app, __dirname, ['./app/bot-coins/**/*.js']);
market_maker_swagger_1.configMarketMakerSwagger(app, __dirname, ['./app/market-maker/**/*.js']);
bot_garch_swagger_1.configBotGarchSwagger(app, __dirname, ['./app//bot-garch/**/*.js']);
strategy_swagger_1.configStrategySwagger(app, __dirname, ['./app/strategy/**/*.js']);
common_swagger_1.configCommonSwagger(app, __dirname, ['./app/commons/**/*.js']);
bot_telegram_swagger_1.configBotTelegramSwagger(app, __dirname, ['./app/bot-telegram/**/*.js']);
exchanger_manager_swagger_1.exchangeManagerSwagger(app, __dirname, ['./app/exchange-manager/**/*.js']);
//# sourceMappingURL=index.js.map