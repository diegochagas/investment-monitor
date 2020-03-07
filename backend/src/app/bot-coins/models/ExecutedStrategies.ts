import {Typegoose} from "typegoose";
import {connectToArbitrorDB} from "../db/db";
import {IOperation} from "./interface/IOperation";

/**
 * @typedef ExecutedStrategies
 * @property { integer } sessionTimeStamp
 * @property { integer } timeStamp
 * @property { Operation.model } operation
 */
export class ExecutedStrategies extends Typegoose{
    sessionTimeStamp?: number = undefined;
    timeStamp?: number = undefined;
    operation?: IOperation = undefined;
}

export const ExecutedStrategiesSchema = new ExecutedStrategies().getModelForClass(ExecutedStrategies, {
    existingConnection: connectToArbitrorDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'executedStrategies'
    }
});
