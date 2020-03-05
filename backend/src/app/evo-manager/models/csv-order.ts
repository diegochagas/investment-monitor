import {prop, Typegoose} from "typegoose";
import {IsDefined, IsEmail, IsEnum, IsNumber, IsString} from "class-validator";
import {connectToEvoManagerDB} from "../db/db";

export enum SIDE {
    SELL = 'SELL',
    BUY = 'BUY',
}

export enum ORDER_TYPE {
    MARKET = 'MARKET',
    LIMIT = 'LIMIT'
}

export interface ExecutiionStatus {
    message: string;
    timestamp: number;
}

export class CsvOrder extends Typegoose {

    @IsString()
    @IsDefined()
    @prop({ uppercase: true })
    csvFileName?: string = undefined;

    @IsString()
    @IsDefined()
    @prop({ uppercase: true })
    base?: string = undefined;

    @IsString()
    @IsDefined()
    @prop({ uppercase: true })
    quote?: string= undefined;

    @IsDefined()
    @IsNumber()
    @prop()
    quantity?: number = undefined;

    @IsDefined()
    @IsNumber()
    @prop()
    price?: number = undefined;

    @IsDefined()
    @IsEnum(ORDER_TYPE)
    @prop({ enum: ORDER_TYPE })
    type?: ORDER_TYPE = undefined;

    @IsDefined()
    @IsEnum(SIDE)
    @prop({ enum: SIDE })
    side?: SIDE = undefined;

    @IsDefined()
    @IsString()
    @prop()
    name?: string = undefined;

    @IsDefined()
    @IsEmail()
    @prop()
    email_quantum?: string = undefined;

    @prop()
    executionStatus: ExecutiionStatus[] =  [];
}

export const CsvOrderSchema = new CsvOrder().getModelForClass(CsvOrder, {
    existingConnection: connectToEvoManagerDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'csv-orders'
    }
})
