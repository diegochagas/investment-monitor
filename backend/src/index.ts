/*
* Copyright (C) Atlas Project LLC
* All Rights Reserved.
*
* Unauthorized copying of this file, via any medium is strictly prohibited.
*
* Proprietary and confidential.
*/


import {exchangeManagerSwagger} from "./swagger/exchanger-manager-swagger";

if(process.env.NODE_ENV && process.env.NODE_ENV === 'local') {
    console.log('Loading .env file on start application');
    require('dotenv').config();
}
import { configBotCoinsSwagger } from "./swagger/bot-coins-swagger";
import {configBotTelegramSwagger} from "./swagger/bot-telegram-swagger";
import {configBotGarchSwagger} from "./swagger/bot-garch-swagger";
import {configMarketMakerSwagger} from "./swagger/market-maker-swagger";
import {configStrategySwagger} from "./swagger/strategy-swagger";
import {configCommonSwagger} from "./swagger/common-swagger";
import {AppServer} from "./infra/app-server";
import marketMaker from './app/market-maker/app';
import strategy from './app/strategy/app';
import common from './app/commons/app';
import botGarch from './app/bot-garch/app';
import botCoins from './app/bot-coins/app';
import botTelegram from './app/bot-telegram/app';
import exchangeManager from './app/exchange-manager/app';
import evoManager from './app/evo-manager/app';
import {morganConfigRequestBody, morganConfigRequestHeader} from "./shared/helpers/morgan-logger-config";
import morgan from "./shared/middlewares/morgan";
import logger from "./shared/middlewares/winston";
import morganBody from "morgan-body";
const app = new AppServer().getApp();
app.use(morgan(morganConfigRequestHeader, { stream: logger.stream }));
app.use(morgan(morganConfigRequestBody, { stream: logger.stream }));
morganBody(app, {
    stream: logger.stream,
});
app.use('/market-maker', marketMaker);
app.use('/strategy', strategy);
app.use('/general-system', common);
app.use('/bot-garch', botGarch);
app.use('/bot-coins', botCoins);
app.use('/bot-telegram', botTelegram);
app.use('/exchange-manager', exchangeManager);
app.use('/evo-manager', evoManager);
app.get('/', (req, res) => {
    const baseUrl = `http://${req.get('host')}${req.originalUrl}`;
    res.send(`
        <html> 
            <head>
                <title> Swaggers </title>
            </head>
            <body>
                <ul>
                    <li><a href=${baseUrl}market-maker/api-docs target="_blank">Market Maker<a></li>
                    <li><a href=${baseUrl}bot-garch/api-docs target="_blank">Bot Garch</a></li>
                    <li><a href=${baseUrl}bot-telegram/api-docs target="_blank">Bot Telegram</a></li>
                    <li><a href=${baseUrl}general-system/api-docs target="_blank">General System</a></li>
                    <li><a href=${baseUrl}strategy/api-docs target="_blank">Strategy</a></li>
                    <li><a href=${baseUrl}bot-coins/api-docs target="_blank">Bot Coins</a></li>
                    <li><a href=${baseUrl}exchange-manager/api-docs target="_blank">Exchange Manager</a></li>
                </ul>
            </body>
        </html>
    `)
});
configBotCoinsSwagger(app, __dirname, ['./app/bot-coins/**/*.js']);
configMarketMakerSwagger(app, __dirname, ['./app/market-maker/**/*.js']);
configBotGarchSwagger(app, __dirname, ['./app//bot-garch/**/*.js']);
configStrategySwagger(app, __dirname, ['./app/strategy/**/*.js']);
configCommonSwagger(app, __dirname, ['./app/commons/**/*.js']);
configBotTelegramSwagger(app, __dirname, ['./app/bot-telegram/**/*.js']);
exchangeManagerSwagger(app, __dirname, ['./app/exchange-manager/**/*.js']);
