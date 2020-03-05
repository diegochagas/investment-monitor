"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationResponse_1 = require("../../../shared/models/ApplicationResponse");
var dynamicRoutes_1 = require("../../../shared/helpers/dynamicRoutes");
/**
 * @typedef Route
 * @property { string } pageName - Name of page - eg: Dashboard
 * @property { string } path - Path of api - eg: /route
 */
exports.getRoutes = function (req, res) {
    var routes = dynamicRoutes_1.DynamicRoutes.getApplications().map(function (app) { return ({
        name: app.name,
        pages: app.pages.map(function (page) { return ({
            path: page.path,
            rule: 'read'
        }); })
    }); });
    res.status(200).json(new ApplicationResponse_1.ApplicationResponse(200, routes));
};
//# sourceMappingURL=route.js.map