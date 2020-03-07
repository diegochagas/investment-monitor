import { Typegoose, prop, Ref } from 'typegoose';
import 'reflect-metadata';
import {IsDefined, IsEnum, IsString} from 'class-validator';
import {AbstractStrategy} from "../../../strategy/models/strategy/AbstractStrategy";
import {connectToCommonDB} from '../../db/db';

export enum InstanceStatus {

  STALLED = 'STALLED',
  OFFLINE = 'OFFLINE',
  RUNNING = 'RUNNING',
  PENDING = 'PENDING',
  STOPPED = 'STOPPED'
}

export enum InstanceType {
  GARCH = 'GARCH',
  TELEGRAM = 'TELEGRAM',
  MARKETMAKER = 'MARKETMAKER'
}


/**
 * @typedef Instance
 * @property { string } label.required - Instance label - eg: label name
 * @property { string } instanceId.required - docker container name of instance - eg: mm-node-01
 * @property { enum } type - InstanceType - eg: 'GARCH', 'TELEGRAM', 'MARKETMAKER'
 * @property { enum } status - InstanceStatus - eg: 'STALLED', 'OFFLINE', 'RUNNING', 'PENDING', 'STOPPED'
 * @property { object } strategy - strategyId or strategy model
 * @property { string } reason - Error description
 */
export class Instance extends Typegoose {
  
  @IsDefined()
  @IsString()
  @prop()  
  label?: string = undefined;
  
  @IsDefined()
  @IsString()
  @prop({ unique: true })
  instanceId?: string = undefined;


  @IsDefined()
  @IsEnum(InstanceType)
  @prop({enum: InstanceType})
  type?: InstanceType = undefined;

  @IsDefined()
  @IsEnum(InstanceStatus)
  @prop({enum: InstanceStatus})
  status?: InstanceStatus = InstanceStatus.STOPPED;
  
  @prop(/*{ ref: AbstractStrategy, required: false }*/)
  strategy?: /*Ref<AbstractStrategy<any>>*/ string | AbstractStrategy<any>;

  @prop()
  updatedAt?;

  @prop()
  reason?: string
}

export const InstanceSchema = new Instance().getModelForClass(Instance, {
  existingConnection: connectToCommonDB(),
  schemaOptions: {
    timestamps: { createdAt: true, updatedAt: true }, collection: 'instance',
  }
});
