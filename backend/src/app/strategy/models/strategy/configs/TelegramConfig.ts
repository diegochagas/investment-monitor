import 'reflect-metadata';
import {IsDefined, IsNumber, IsArray,IsString} from 'class-validator';
import {ConfigStrategy} from "./ConfigStrategy";
import {IConfig} from "../interfaces/IConfig";
import {Pair} from "./types/Pair";

/**
 * @typedef Config
 * @property { ConfigContent } content.required - Content required to robot
 * @property { integer } orderSize.required - Size of order - eg: 20000
 * @property { string } exchange.required 
 */
export class TelegramConfig implements IConfig {
    strategy: ConfigStrategy = new ConfigStrategy();

    pairs?: Pair[] = undefined;

    @IsDefined()
    @IsNumber()
    orderSize?: number = undefined;

    @IsDefined()
    @IsString()
    exchange?: number = undefined;

    /**
     * criado dinamicamente
     */
    walletId?: string = undefined;
}
