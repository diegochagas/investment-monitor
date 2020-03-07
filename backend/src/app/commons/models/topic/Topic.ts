import {prop, Typegoose} from "typegoose";
import {IsDefined, IsEnum, IsOptional, IsString} from "class-validator";
import {connectToCommonDB} from "../../db/db";

export const TOPIC_QUEUE = `CRYPTODATA_CREATE_TOPIC`;

export enum TopicType {
    TICKER = 'TICKER',
    CANDLE = 'CANDLE',
    FOREX  = 'FOREX',
    TRADE  = 'TRADE'
}

/**
 * @typedef Topic
 * @property { string } name.required - Topic name - eg: COINAPI_BRAZILIEX_TICKER_BTC_BRL
 * @property { enum } type.required - Topic type -eg: 'TICKER', 'CANDLE', 'FOREX', 'TRADE'
 * @property { string } group - Group of topic, send 'ALL' or null
 */
export class Topic extends Typegoose {

    @IsDefined()
    @IsString()
    @prop({ unique: true })
    name?: string = undefined;

    @IsOptional()
    @IsEnum(TopicType)
    @prop()
    type?: TopicType = undefined;

    @IsString()
    @IsOptional()
    @prop()
    group?: string = undefined;
}

export const TopicSchema = new Topic().getModelForClass(Topic, {
    existingConnection: connectToCommonDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'topics'
    }
});
