import {prop} from "typegoose";
import {AbstractStrategy} from "./AbstractStrategy";
import {connectToStrategyDB} from "../../db/db";
import {TelegramConfig} from "./configs/TelegramConfig";
import {StrategyStatus} from "./enums/StrategyStatus";
import {IsArray, IsDefined, validate, ValidateNested} from "class-validator";
import {handleValidateError} from "../../../../shared/helpers/handleValitateError";
import {Project} from "../../../../shared/models/enum/projectName";
import {Pair} from "./configs/types/Pair";

/**
 * @typedef TelegramStrategy
 * @property { Array.<Pair> } pairs.required
 */
export class TelegramStrategy extends AbstractStrategy<TelegramConfig> {

    @prop({ index: true, default: Project.TELEGRAM })
    strategyType;

    @IsDefined()
    @IsArray()
    @ValidateNested()
    pairs?: Pair[] = [new Pair()];

    constructor() {
        super(TelegramConfig)
    }

    async assembleMockedValues(locals: any) {
        this.updatedBy = locals.user ? locals.user.uid : "created-locally";
        this.createdBy = locals.user ? locals.user.uid : "created-locally";
        this.status = StrategyStatus.ACTIVE;
        delete this.config.strategy;
        this.config.pairs = this.pairs;
        const validation = await validate(this);
        await handleValidateError(validation);
        this.config.walletId = this.name ? this.name.replace(/ /g, '') : "";
    }

    getHeaders(): {[id: string]: string}[] {
        return [Object.keys(new Pair()).reduce((previous, current) => ({
            ...previous,
            [current]: ""
        }), {})];
    }
}

export const StrategyTelegramSchema = new TelegramStrategy().getModelForClass(TelegramStrategy, {
    existingConnection: connectToStrategyDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'strategies'
    }
});
