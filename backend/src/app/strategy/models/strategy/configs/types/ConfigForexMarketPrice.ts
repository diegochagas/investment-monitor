/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
import {IsString} from "class-validator";

/**
 * Mercado Forex (USD, BRL, EUR...)
 * @typedef ConfigForexMarketPrice
 * @property { string } subscribe
 * @property { string } currencyBase
 * @property { string } currencyQuote
 */
export class ConfigForexMarketPrice {
    /**
     * Topico para subscribe
     */
    @IsString()
    subscribe?: string = undefined;

    /**
     * Base
     */
    @IsString()
    currencyBase?: string = undefined;

    /**
     * Quote
     */
    @IsString()
    currencyQuote?: string = undefined;
}
