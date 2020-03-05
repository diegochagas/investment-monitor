"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_strategy_1 = require("../../app/strategy/services/service.strategy");
var GarchStrategy_1 = require("../../app/strategy/models/strategy/GarchStrategy");
var MarketMakerStrategy_1 = require("../../app/strategy/models/strategy/MarketMakerStrategy");
var TelegramStrategy_1 = require("../../app/strategy/models/strategy/TelegramStrategy");
var BotCoinsStrategy_1 = require("../../app/strategy/models/strategy/BotCoinsStrategy");
var projectName_1 = require("../models/enum/projectName");
//botgarch, bottelegram, generalsystem, marketmaker
//@todo find a better place to store the headers name
var HEADER_PROJECT_NAME = 'Project';
exports.HEADER_PROJECT_NAME = HEADER_PROJECT_NAME;
var services = new Map();
exports.services = services;
services.set(projectName_1.Project.GARCH, new service_strategy_1.ServiceStrategy(GarchStrategy_1.GarchStrategy, GarchStrategy_1.StrategyGarchSchema));
services.set(projectName_1.Project.MARKET_MAKER, new service_strategy_1.ServiceStrategy(MarketMakerStrategy_1.MarketMakerStrategy, MarketMakerStrategy_1.StrategyMarketMakerSchema));
services.set(projectName_1.Project.TELEGRAM, new service_strategy_1.ServiceStrategy(TelegramStrategy_1.TelegramStrategy, TelegramStrategy_1.StrategyTelegramSchema));
services.set(projectName_1.Project.BOT_COINS, new service_strategy_1.ServiceStrategy(BotCoinsStrategy_1.BotCoinsStrategy, BotCoinsStrategy_1.StrategyBotCoinsSchema));
var schemas = new Map();
exports.schemas = schemas;
schemas.set(projectName_1.Project.GARCH, GarchStrategy_1.StrategyGarchSchema);
schemas.set(projectName_1.Project.MARKET_MAKER, MarketMakerStrategy_1.StrategyMarketMakerSchema);
schemas.set(projectName_1.Project.TELEGRAM, TelegramStrategy_1.StrategyTelegramSchema);
schemas.set(projectName_1.Project.BOT_COINS, BotCoinsStrategy_1.StrategyBotCoinsSchema);
schemas.set('DEFAULT', GarchStrategy_1.StrategyGarchSchema);
//# sourceMappingURL=factorPool.js.map