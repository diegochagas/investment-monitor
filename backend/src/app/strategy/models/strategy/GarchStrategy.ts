import {GarchConfig} from "./configs/GarchConfig";
import {prop} from "typegoose";
import {AbstractStrategy} from "./AbstractStrategy";
import {connectToStrategyDB} from "../../db/db";
import {IsDefined, IsString, validate} from "class-validator";
import {handleValidateError} from "../../../../shared/helpers/handleValitateError";
import {StrategyStatus} from "./enums/StrategyStatus";
import {Project} from "../../../../shared/models/enum/projectName";
import {ExchangeSchema} from "../../../commons/models/exchange/Exchange";
import {ApplicationResponse} from "../../../../shared/models/ApplicationResponse";
import {SystemErrors} from "../../../../shared/helpers/system-errors";


/**
 * @typedef GarchStrategy
 * @property { string } startegyType - Type of the strategy - eg: GARCH
 * @property { string } finPair.required - FinPair - eg: USD
 * @property { string } iniPair.required - IniPair - eg: BTC
 */
export class GarchStrategy extends AbstractStrategy<GarchConfig> {

    @prop({ index: true, default: Project.GARCH })
    strategyType;

    @prop()
    @IsDefined()
    @IsString()
    finPair?: string = undefined;

    @prop()
    @IsDefined()
    @IsString()
    iniPair?: string = undefined;

    constructor() {
        super(GarchConfig)
    }

    async assembleMockedValues(locals: any) {
        this.updatedBy = locals.user ? locals.user.uid : "created-locally";
        this.createdBy = locals.user ? locals.user.uid : "created-locally";
        this.status = StrategyStatus.ACTIVE;
        delete this.config.strategy;
        const validation = await validate(this);
        await handleValidateError(validation);
        this.config.walletId = this.name ? this.name.replace(/ /g, '') : "";

        const exchange = await ExchangeSchema.findById(this.config.exchange).exec();
        if(exchange) {

            
            this.config.exchangeName = exchange.name;
            this.config.exchangeOptions = {
                coinApiRoom: `COINAPI_${(exchange.name as string).toUpperCase()}_CANDLE_${this.iniPair}_${this.finPair}`,
                coinApiRest: `${this.getExchangeFullName((exchange.name as string)).toUpperCase()}${this.iniPair}_${this.finPair}`
            }


        } else {
            throw new ApplicationResponse<any>(400, {}, SystemErrors.STRATEGY_EXCHANGE_NOTFOUND.message, SystemErrors.STRATEGY_EXCHANGE_NOTFOUND.code);
        }
    }

    getExchangeFullName(exchange:string):string{
        if(exchange.toUpperCase()=="BINANCE"){
            return `${exchange.toUpperCase()}_SPOT_`
        }
        else if(exchange.toUpperCase()=="BITMEX"){
            return `${exchange.toUpperCase()}_PERP_`
        }
        else{
            return ""
        }
    }
}

export const StrategyGarchSchema = new GarchStrategy().getModelForClass(GarchStrategy, {
    existingConnection: connectToStrategyDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'strategies'
    }
});
