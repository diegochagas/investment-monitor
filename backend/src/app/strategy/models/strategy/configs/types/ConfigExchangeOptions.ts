/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

/**
 * Exchange Collection provide this values
 * @typedef ConfigExchangeOptions
 * @property { integer } maxConcurrentRequests
 * @property { integer } minTimeBetweenRequests
 * @property { string } coinApiRoom - Websocket to receive btc price
 */
export class ConfigExchangeOptions {
    maxConcurrentRequests?: number;
    minTimeBetweenRequests?: number;
    coinApiRoom?: string;
    coinApiRest?: string;
}
