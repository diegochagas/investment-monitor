/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
import { IsDefined, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Typegoose, prop } from 'typegoose';
import { IConfig } from './interfaces/IConfig';
import 'reflect-metadata';
import {connectToMarketMakerDB} from "../db/db";

export class StrategyHistory extends Typegoose {

  @IsDefined()
  @IsNumber()
  @prop()
  version?: number = undefined;

  @IsDefined()
  @IsString()
  @prop()
  name?: string = undefined;

  @IsDefined()
  @IsNumber()
  @prop()
  endTimestamp?: number = undefined;
  
  @IsDefined()
  @IsNumber()
  @prop()
  initTimestamp?: number = undefined;
  
  @IsDefined()
  @IsString()
  @prop()
  parentId?: string = undefined;
  
  @ValidateNested()
  @IsDefined()
  @prop()
  config? = new IConfig();
}

export const StrategyHistorySchema = new StrategyHistory().getModelForClass(StrategyHistory, {
  existingConnection: connectToMarketMakerDB(),
  schemaOptions: {
    collection: 'strategies_history',
    timestamps: { createdAt: true, updatedAt: true },
  }
});
