import {ServiceStrategy} from "../../app/strategy/services/service.strategy";
import {Typegoose} from "typegoose";
import {GarchStrategy, StrategyGarchSchema} from "../../app/strategy/models/strategy/GarchStrategy";
import {MarketMakerStrategy, StrategyMarketMakerSchema} from "../../app/strategy/models/strategy/MarketMakerStrategy";
import {StrategyTelegramSchema, TelegramStrategy} from "../../app/strategy/models/strategy/TelegramStrategy";
import {BotCoinsStrategy, StrategyBotCoinsSchema} from "../../app/strategy/models/strategy/BotCoinsStrategy";
import {Model} from "mongoose";
import {Project} from "../models/enum/projectName";

//botgarch, bottelegram, generalsystem, marketmaker
//@todo find a better place to store the headers name
const HEADER_PROJECT_NAME = 'Project';

const services = new Map<string, ServiceStrategy<any, Typegoose>>();
services.set(Project.GARCH, new ServiceStrategy<GarchStrategy, Typegoose>(GarchStrategy , StrategyGarchSchema));
services.set(Project.MARKET_MAKER, new ServiceStrategy<MarketMakerStrategy, Typegoose>(MarketMakerStrategy , StrategyMarketMakerSchema));
services.set(Project.TELEGRAM, new ServiceStrategy<TelegramStrategy, Typegoose>(TelegramStrategy , StrategyTelegramSchema));
services.set(Project.BOT_COINS, new ServiceStrategy<BotCoinsStrategy, Typegoose>(BotCoinsStrategy , StrategyBotCoinsSchema));

const schemas = new Map<string, Model<any>>();
schemas.set(Project.GARCH, StrategyGarchSchema);
schemas.set(Project.MARKET_MAKER, StrategyMarketMakerSchema);
schemas.set(Project.TELEGRAM, StrategyTelegramSchema);
schemas.set(Project.BOT_COINS, StrategyBotCoinsSchema);
schemas.set('DEFAULT', StrategyGarchSchema);

export {
    HEADER_PROJECT_NAME,
    services,
    schemas
}