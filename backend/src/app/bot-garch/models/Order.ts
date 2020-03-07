import {prop, Typegoose} from "typegoose";
import {IConfigStrategy} from "../../../shared/models/interface/IConfigStrategy";
import {OrderContent} from "./OrderContent";
import {connectToTopicPersistentDB} from "../../../shared/db/db-topic-persistent";

/**
 * @typedef Order
 * @property { string } action
 * @property { string } type
 * @property { string } instance
 * @property { OrderContent.model } content
 * @property { IConfigStrategy.model } strategy
 */
export class OrderGarch extends Typegoose {

    @prop()
    action?: string;

    @prop()
    type?: string;

    @prop()
    instance?: string;

    @prop()
    content?: OrderContent;

    @prop()
    strategy?: IConfigStrategy;

    @prop()
    timestamp?: number;
}

export const OrderGarchSchema = new OrderGarch().getModelForClass(OrderGarch, {
    existingConnection: connectToTopicPersistentDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'BOT_EVENTS_GARCH'
    }
});

/**
 * @typedef IConfigStrategy
 * @property { string } name
 * @property { integer } version
 */
