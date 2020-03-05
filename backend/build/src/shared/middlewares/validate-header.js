"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var factorPool_1 = require("../util/factorPool");
var projectName_1 = require("../models/enum/projectName");
var ApplicationResponse_1 = require("../models/ApplicationResponse");
var ignorePath = ['api-docs', 'api-docs.json'];
function validateHeader(req, res, next) {
    if (ignorePath.includes(req.path.split('/')[1]))
        return next();
    if (!req.header(factorPool_1.HEADER_PROJECT_NAME))
        return res.status(428).json(new ApplicationResponse_1.ApplicationResponse(428, {}, "Header '" + factorPool_1.HEADER_PROJECT_NAME + "' is not defined"));
    if (!Object.keys(projectName_1.HeaderProject).includes(req.header(factorPool_1.HEADER_PROJECT_NAME)))
        return res.status(412).json(new ApplicationResponse_1.ApplicationResponse(412, {}, "Project name not found"));
    else
        next();
}
exports.default = validateHeader;
//# sourceMappingURL=validate-header.js.map