"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
var ConfigGlobal = /** @class */ (function () {
    function ConfigGlobal() {
        //test 1
        this.loopInterval = 1000;
        this.loopType = 'STREAM';
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