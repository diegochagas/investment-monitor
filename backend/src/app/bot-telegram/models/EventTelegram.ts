import {prop, Typegoose} from "typegoose";
import {IConfigStrategy} from "../../../shared/models/interface/IConfigStrategy";
import {IContent} from "./interfaces/IContent";
import {Action} from "./enums/Actions";
import {connectToTopicPersistentDB} from "../../../shared/db/db-topic-persistent";

/**
 * @typedef EventsTelegram
 * @property { string } type - Type -eg: Telegram
 * @property { enum } action - Action - eg: INDICATORS,ORDERS
 * @property { string } instance - Instance ID - eg: telegram.singnal
 * @property { IConfigStrategy.model } strategy
 * @property { integer } timestamp
 * @property { IContent.model } content
 */
export class EventsTelegram extends Typegoose {
    @prop()
    type?: string = undefined;

    @prop({
        enum: Action
    })
    action?: Action = undefined;

    @prop()
    instance?: string = undefined;

    @prop()
    strategy?: IConfigStrategy = undefined;

    @prop()
    timestamp?: number = undefined;

    @prop()
    content?: IContent = undefined;
}

export const EventsTelegramSchema = new EventsTelegram().getModelForClass(EventsTelegram, {
    existingConnection: connectToTopicPersistentDB(),
    schemaOptions: {
        timestamps: {createdAt: true, updatedAt: true},
        collection: 'BOT_EVENTS_TELEGRAM'
    }
});

/**
 * @typedef IConfigStrategy
 * @property { string } name
 * @property { integer } version
 */
