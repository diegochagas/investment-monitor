import {prop, Typegoose} from "typegoose";
import {IsDefined, IsString} from "class-validator";
import {connectToCommonDB} from "../../db/db";

/**
 * @typedef ExchangeAlias
 * @property { string } alias.required - Alias to keys - eg: Garch 5 min
 * @property { string } path.required - path to secret manager - eg: /exchange/credentials/binance
 * @property { string } exchangeName.required - Exchange name - eg: Binance
 * @property { string } exchangeId.required - Exchange id -eg: as76da6-7da78da-558das-5d8a
 */
export class ExchangeAlias extends Typegoose {

    @IsString()
    @IsDefined()
    @prop({ unique: true })
    alias?: string = undefined;

    @IsString()
    @IsDefined()
    @prop()
    path?: string = undefined;

    @IsString()
    @IsDefined()
    @prop()
    exchangeName?: string = undefined;

    @IsString()
    @IsDefined()
    @prop()
    exchangeId?: string = undefined;
}

export const ExchangeAliasSchema = new ExchangeAlias().getModelForClass(ExchangeAlias, {
    existingConnection: connectToCommonDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'exchange-alias'
    }
});
