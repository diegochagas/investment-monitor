import { Typegoose, prop } from 'typegoose';
import 'reflect-metadata';
import {IsString, IsDefined, IsUrl, IsNumber, IsOptional} from 'class-validator';
import {connectToCommonDB} from "../../db/db";

/**
 * @typedef Group
 * @property { string } name.required - Group name - eg: Binance friends
 * @property { string } groupId.required - Group Id - eg: 1234
 */
export class Group extends Typegoose {
  
  @IsString()
  @IsDefined()
  @prop()
  name?: string = undefined;

  @IsDefined()
  @IsNumber()
  @prop()
  groupId?: number = undefined;
}

export const GroupSchema = new Group().getModelForClass(Group, {
  existingConnection: connectToCommonDB(),
  schemaOptions: {
    timestamps: { createdAt: true, updatedAt: true },
    collection: 'group'
  }
});
