import {prop} from "typegoose";
import {connectToStrategyDB} from "../../db/db";
import {AbstractStrategy} from "./AbstractStrategy";
import {IsDefined, IsString, validate} from "class-validator";
import {handleValidateError} from "../../../../shared/helpers/handleValitateError";
import {ApplicationResponse} from "../../../../shared/models/ApplicationResponse";
import {SystemErrors} from "../../../../shared/helpers/system-errors";
import {StrategyStatus} from "./enums/StrategyStatus";
import {ExchangeSchema} from "../../../commons/models/exchange/Exchange";
import {MarketMakerConfig} from "./configs/MarketMakerConfig";
import {Project} from "../../../../shared/models/enum/projectName";
import {ConfigReferencePrice} from "./configs/types/ConfigReferencePrice";

/**
 * @typedef MarketMakerStrategy
 * @property { string } startegyType - Type of the strategy - eg: MARKET_MAKER
 * @property { integer } midPrice
 * @property { integer } wakket
 * @property { string } finPair.required - FinPair - eg: USD
 * @property { string } iniPair.required - IniPair - eg: BTC
 */
export class MarketMakerStrategy extends AbstractStrategy<MarketMakerConfig> {

    @prop({ index: true, default: Project.MARKET_MAKER })
    strategyType;

    @prop()
    midPrice?: number = undefined;

    @prop()
    wallet?: number = undefined;

    @prop()
    @IsDefined()
    @IsString()
    finPair?: string = undefined;

    @prop()
    @IsDefined()
    @IsString()
    iniPair?: string = undefined;

    constructor() {
        super(MarketMakerConfig)
    }

    async assembleMockedValues(locals: any) {
        this.updatedBy = locals.user ? locals.user.uid : "created-locally";
        this.createdBy = locals.user ? locals.user.uid : "created-locally";
        this.status = StrategyStatus.ACTIVE;
        delete this.config.strategy;
        const validation = await validate(this);
        await handleValidateError(validation);

        this.config.walletId = this.name ? this.name.replace(/ /g, '') : "";

        /**
         * Regra de forex
         */
        if(this.finPair === 'BRL' || this.iniPair === 'BRL') {
            (<ConfigReferencePrice>this.config.referencePrice).forexEnable = true;
            this.config.forexMarketPrice = {
                currencyBase: "BRL",
                currencyQuote: "USD",
                subscribe: "FOREXAPI_CURRENCY_TICKER_USD_BRL"
            }
        }

        const exchange = await ExchangeSchema.findById(this.config.exchange).exec();
        if(exchange) {
            this.config.exchangeName = exchange.name;
            this.config.exchangeOptions = {
                maxConcurrentRequests: exchange.maxConcurrentRequests,
                minTimeBetweenRequests: exchange.minTimeBetweenRequests
            }
        } else {
            throw new ApplicationResponse<any>(400, {}, SystemErrors.STRATEGY_EXCHANGE_NOTFOUND.message, SystemErrors.STRATEGY_EXCHANGE_NOTFOUND.code);
        }
        this.config.global.loopType = 'STREAM';
        this.config.global.loopInterval = 10000;
        return this;
    }
}

export const StrategyMarketMakerSchema = new MarketMakerStrategy().getModelForClass(MarketMakerStrategy, {
    existingConnection: connectToStrategyDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'strategies'
    }
});
