import { Typegoose, prop } from 'typegoose';
import 'reflect-metadata';
import {IsString, IsDefined, IsUrl, IsNumber, IsOptional} from 'class-validator';
import {connectToCommonDB} from "../../db/db";

/**
 * @typedef Exchange
 * @property { string } name.required - Exchange name - eg: Binance
 * @property { string } url.required - Exchange url - eg: "https://api.com/"
 * @property { string } icon.required - Exchange icon - eg: "base64 str"
 */

export class Exchange extends Typegoose {
  
  @IsString()
  @IsDefined()
  @prop()
  name?: string = undefined;

  @IsDefined()
  @IsUrl()
  @prop()
  url?: string = undefined;

  @IsDefined()
  @IsString()
  @prop()
  iconFile?: string = undefined;


  // TODO voltar para defined quando tivermos autenticação
  @IsOptional()
  @IsString()
  @prop()
  userUid?: string = undefined;
  
  @IsNumber()
  @prop()
  maxConcurrentRequests?: number = undefined;
  
  @IsNumber()
  @prop()
  minTimeBetweenRequests?: number = undefined;
}

export const ExchangeSchema = new Exchange().getModelForClass(Exchange, {
  existingConnection: connectToCommonDB(),
  schemaOptions: {
    timestamps: { createdAt: true, updatedAt: true },
    collection: 'exchange'
  }
});
