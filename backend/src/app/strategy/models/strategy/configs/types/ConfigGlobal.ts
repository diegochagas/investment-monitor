/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

/**
 * @typedef ConfigGlobal
 * @property { integer } loopInterval - Loop Interval - eg: 1000
 * @property { string } loopType - Loop Type - eg: STREAM
 * @property { integer } statusInterval
 * @property { integer } dataReloadInterval
 */
export class ConfigGlobal {
    //test 1
    loopInterval?: number = 1000;
    loopType?: string = 'STREAM';
    historicalBalance?: boolean = false;

    /**
     * Intervalo para envio de status (hearth beat)
     */
    statusInterval?: number = undefined;

    /**
     * Intervalo para recarregar dados consolidados (balance reload)
     */
    dataReloadInterval?: number = undefined;
}
