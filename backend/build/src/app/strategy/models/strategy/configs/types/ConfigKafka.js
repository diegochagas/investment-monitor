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
 * @typedef ConfigKafka
 * @property { Array.<string> } subscribe
 */
var ConfigKafka = /** @class */ (function () {
    function ConfigKafka() {
        /**
         * valor não enviado pelo backend, validar com secret manager
         */
        // host: string = undefined;
        /**
         * Lista de tópicos do cryptoMarketPrice e forexMarketPrice
         */
        this.subscribe = [];
    }
    return ConfigKafka;
}());
exports.ConfigKafka = ConfigKafka;
//# sourceMappingURL=ConfigKafka.js.map