import 'reflect-metadata';
import {ConfigStrategy} from "./ConfigStrategy";
import {IConfig} from "../interfaces/IConfig";

/**
 * @typedef Config
 */
export class BotCoinsConfig implements IConfig {
    strategy: ConfigStrategy = new ConfigStrategy();
}