import { Typegoose, prop } from 'typegoose';
import 'reflect-metadata';
import { IsDefined, IsString, IsNumber } from 'class-validator'
import {connectToMarketMakerDB} from "../db/db";

/**
 * @typedef Order
 * @property { string } strategy.required - Strategy name - eg: strategy0name
 * @property { string } exchange.required - Exchange name - eg: Binance
 * @property { string } market.required - Market - eg: BTC_USDT
 * @property { string } symbol.required - Symbol - eg: Symbol
 * @property { string } currency.required - Currency eg: USDT
 * @property { string } orderId - Order ID - eg: 36546984
 * @property { string } guID.required - guID - eg: 368232775.atlas01@binance
 * @property { integer } price.required - Price - eg: 7811.78
 * @property { integer } quantity.required - Quantity - eg: 20.654635
 * @property { integer } quantitySymbol.required - Quantity - eg: 20.654635
 * @property { integer } fee.required - Fee - eg: 0.0000000062
 * @property { enum } side.required - Side - eg: BUY, SELL
 * @property { string } status.required - Status - eg: CANCELED
 * @property { string } instanceID.required - Instance - eg: 32fsd-1sfv2-g2sfdgsd5-gd3f51d
 */
export class Order extends Typegoose {

  @IsString()
  @IsDefined()
  @prop()
  strategy?: string = undefined;

  @IsString()
  @IsDefined()
  @prop()
  exchange?: string = undefined;

  @IsString()
  @IsDefined()
  @prop()
  market?: string = undefined;

  @IsString()
  @IsDefined()
  @prop()
  symbol?: string = undefined;

  @IsString()
  @IsDefined()
  @prop()
  currency?: string = undefined;

  @IsString()
  @IsDefined()
  @prop()
  orderID?: string = undefined;

  @IsString()
  @IsDefined()
  @prop()
  guID?: string = undefined;

  @IsNumber()
  @IsDefined()
  @prop()
  price?: number = undefined;

  @IsNumber()
  @IsDefined()
  @prop()
  quantity?: number = undefined;

  @IsDefined()
  @IsNumber()
  @prop()
  quantitySymbol?: number = undefined;

  @IsNumber()
  @IsDefined()
  @prop()
  fee?: number = undefined;

  @IsString()
  @IsDefined()
  @prop()
  side?: string = undefined;

  @IsString()
  @IsDefined()
  @prop()
  status?: string = undefined;

  @IsNumber()
  @IsDefined()
  @prop()
  timestamp?: number = undefined;

  @IsNumber()
  @IsDefined()
  @prop()
  timestampUpdate?: number = undefined;

  @prop()
  liquidateValue?: number = undefined;

  @prop()
  instance?: string;
}

export enum OrderStatus {
  CANCELED = 'CANCELED',
  OPEN = 'OPEN',
  EXECUTED = 'EXECUTED',
  PARTIALLY_EXECUTED = 'PARTIALLY_EXECUTED',
  LIQUIDATE = 'LIQUIDATE',
  PARTIALLY_LIQUIDATE = 'PARTIALLY_LIQUIDATE'
}

export const OrderSchema = new Order().getModelForClass(Order,
  {
    existingConnection: connectToMarketMakerDB(),
    schemaOptions: {
      timestamps: { createdAt: true, updatedAt: true }, collection: 'order'
    }
  }
);

/**
 * @typedef Strategy
 * @property { string } name.required - Strategy name - eg: MM_TESTE_!
 * @property { integer } version.required - Strategy version - eg: 1
 */

/**
 * @typedef LiquidateRequest
 * @property { enum } side.required - side - eg: BUY,SELL
 * @property { string } instance.required - instanceid - eg: intanceId
 * @property { value } value.required - Value to liquidate - eg: 1.5
 * @property { Strategy.model } strategy.required
 */

/**
 * @typedef LiquidateResponse
 * @property { integer } amountLiquidated
 * @property { integer } leftLiquidate
 * @property { string } message - Mensagem - eg: Amount orders is less then value to liquidate, all orders was liquidated
 */


