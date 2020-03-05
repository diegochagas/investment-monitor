"use strict";
/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef ConfigGlobal
 * @property { integer } loopInterval - Loop Interval - eg: 1000
 * @property { string } loopType - Loop Type - eg: STREAM
 * @property { integer } statusInterval
 * @property { integer } dataReloadInterval
 */
var ConfigGlobal = /** @class */ (function () {
    function ConfigGlobal() {
        //test 1
        this.loopInterval = 1000;
        this.loopType = 'STREAM';
        this.historicalBalance = false;
        /**
         * Intervalo para envio de status (hearth beat)
         */
        this.statusInterval = undefined;
        /**
         * Intervalo para recarregar dados consolidados (balance reload)
         */
        this.dataReloadInterval = undefined;
    }
    return ConfigGlobal;
}());
exports.ConfigGlobal = ConfigGlobal;
//# sourceMappingURL=ConfigGlobal.js.map