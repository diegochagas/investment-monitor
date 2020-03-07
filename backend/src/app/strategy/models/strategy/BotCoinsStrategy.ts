import {prop} from "typegoose";
import {AbstractStrategy} from "./AbstractStrategy";
import {connectToStrategyDB} from "../../db/db";
import {BotCoinsConfig} from "./configs/BotCoinsConfig";
import {StrategyStatus} from "./enums/StrategyStatus";
import {IsArray, IsDefined, validate, ValidateNested} from "class-validator";
import {handleValidateError} from "../../../../shared/helpers/handleValitateError";
import {Project} from "../../../../shared/models/enum/projectName";
import {Pair} from "./configs/types/Pair";

/**
 * @typedef BotCoinsStrategy
 */
export class BotCoinsStrategy extends AbstractStrategy<BotCoinsConfig> {

    @prop({ index: true, default: Project.BOT_COINS })
    strategyType;

    constructor() {
        super(BotCoinsConfig)
    }

    async assembleMockedValues(locals: any) {
        this.updatedBy = locals.user ? locals.user.uid : "created-locally";
        this.createdBy = locals.user ? locals.user.uid : "created-locally";
        this.status = StrategyStatus.ACTIVE;
        delete this.config.strategy;
        const validation = await validate(this);
        await handleValidateError(validation);
    }

    getHeaders(): {[id: string]: string}[] {
        return [Object.keys(new Pair()).reduce((previous, current) => ({
            ...previous,
            [current]: ""
        }), {})];
    }
}

export const StrategyBotCoinsSchema = new BotCoinsStrategy().getModelForClass(BotCoinsStrategy, {
    existingConnection: connectToStrategyDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'strategies'
    }
});
