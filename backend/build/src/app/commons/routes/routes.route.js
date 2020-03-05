"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller = __importStar(require("../controllers/route"));
var express_1 = __importDefault(require("express"));
var routeRoutes = express_1.default.Router();
/**
 * @route GET /route
 * @group route
 * @returns { Array.<Route> } 200
 */
routeRoutes.route('/').get(controller.getRoutes);
exports.default = routeRoutes;
//# sourceMappingURL=routes.route.js.map