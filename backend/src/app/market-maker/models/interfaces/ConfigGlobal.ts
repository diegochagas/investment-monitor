/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
export class ConfigGlobal {
    //test 1
    loopInterval?: number = 1000;
    loopType?: string = 'STREAM';

    /**
     * Intervalo para envio de status (hearth beat)
     */
    statusInterval?: number = undefined;

    /**
     * Intervalo para recarregar dados consolidados (balance reload)
     */
    dataReloadInterval?: number = undefined;
}