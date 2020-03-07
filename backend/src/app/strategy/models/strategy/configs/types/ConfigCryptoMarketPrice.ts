/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
import {IsArray, IsBoolean} from "class-validator";

/**
 * @typedef ConfigCryptoMarketPrice
 * @property { Array.<string> } exchangesInside
 * @property { Array.<string> } exchangesOutside
 * @property { boolean } forexEnable
 */
export class ConfigCryptoMarketPrice {
    /**
     * Topicos para exchanges internas
     */
    @IsArray()
    exchangesInside?: string[] = [''];
    /**
     * Topicos para exchanges externas
     */
    @IsArray()
    exchangesOutside: string[] = [''];
    /**
     * Habilita ou não o forex no cálculo
     */
    @IsBoolean()
    forexEnable?: boolean = undefined;
}
