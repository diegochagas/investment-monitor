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
var DynamicRoutes = /** @class */ (function () {
    function DynamicRoutes() {
    }
    DynamicRoutes.addConfig = function (config) {
        this.jsonRoutes.push(config);
    };
    DynamicRoutes.getApplications = function () {
        return this.jsonRoutes.map(function (config) { return ({
            name: config.basePath.substr(1),
            pages: config.tags.map(function (tag) { return ({
                path: '/' + tag.name,
                description: tag.description
            }); })
        }); });
    };
    DynamicRoutes.jsonRoutes = [];
    return DynamicRoutes;
}());
exports.DynamicRoutes = DynamicRoutes;
//# sourceMappingURL=dynamicRoutes.js.map