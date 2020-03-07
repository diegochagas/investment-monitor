import {prop, Typegoose} from "typegoose";
import {connectToCommonDB} from "../../db/db";

/**
 * @typedef BotEvents
 * @property { object } data
 * @property { string } type
 */
export class BotEvents extends Typegoose {
    @prop()
    data: any;

    @prop({unique: true, required: true})
    type?: string
}

export const BotEventsSchema = new BotEvents().getModelForClass(BotEvents, {
    existingConnection: connectToCommonDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'bot-events'
    }
});
