"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller = __importStar(require("../controllers/secret-keys"));
var secretKeyRoute = express_1.Router();
secretKeyRoute.post('/', controller.save);
secretKeyRoute.get('/', controller.get);
secretKeyRoute.put('/', controller.update);
secretKeyRoute.delete('/', controller.exclude);
exports.default = secretKeyRoute;
//# sourceMappingURL=secret-keys.route.js.map