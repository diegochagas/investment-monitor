import {pre, prop, Typegoose} from "typegoose";
import {IsDefined, IsEnum, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {IStrategy} from "./interfaces/IStrategy";
import {StrategyStatus} from "./enums/StrategyStatus";
import {ApplicationResponse} from "../../../../shared/models/ApplicationResponse";

/**
 * @typedef AbstractStrategy
 * @property { string } name.required - AbstractStrategy name - eg: catatau_teste
 * @property { createdBy } createdBy.required - User id, get from header - eg: 4c34c-3t43t-34tb3vt-vb34t
 * @property { enum } status.required - Status - eg: active. inactive
 * @property { updatedBy } updatedBy.required - User id, get from header - eg: 4c34c-3t43t-34tb3vt-vb34t
 * @property { object } config.required -  - eg: GarchConfig, MarketMakerConfig, TelegramConfig
 * @property { string } iniPair.required
 * @property { string } finPair.required
 */
@pre<AbstractStrategy<any>>('save', function(next) {
    this.config.walletId = this.name ? this.name.replace(/ /g, '') : "";
    const md5 = require('md5');
    const clone = <AbstractStrategy<any>>JSON.parse(JSON.stringify(this));
    delete clone.config.strategy;
    this.md5 = md5(JSON.stringify(clone.config));
    this.presentationName = `${this.name}-v.${(this.config.strategy as any).version as number}`;
    next()
})
export abstract class AbstractStrategy<T> extends Typegoose implements IStrategy<T> {

    @IsDefined()
    @IsString()
    @prop()
    name?: string = undefined;

    @IsDefined()
    @IsString()
    @prop()
    createdBy?: string = undefined;

    @IsOptional()
    @IsEnum(StrategyStatus)
    @prop({enum: StrategyStatus})
    status: StrategyStatus = StrategyStatus.ACTIVE;

    @IsString()
    @IsOptional()
    @prop()
    updatedBy?: string = undefined;

    @IsDefined()
    @ValidateNested()
    @prop()
    config: T;

    @prop()
    presentationName?: string;

    @prop()
    md5?: string;

    @prop()
    used?: boolean;

    @IsOptional()
    @IsNumber()
    @prop()
    version?: number = 1;

    @prop()
    instance?: string = undefined;

    constructor(type: { new (): T }) {
        super();
        this.config = new type();
    }

    /*protected*/ assembleMockedValues(locals: any) {
        throw new Error("Method not implemented.");
    }

    getHeaders(): {[id: string]: string}[] {
        throw new ApplicationResponse(500, {}, 'Method not implemented')
    }
}
