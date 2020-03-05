"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller = __importStar(require("../controllers/csv-order"));
var csvOrderRoute = express_1.default.Router();
csvOrderRoute.post('/', controller.save);
csvOrderRoute.get('/', controller.getAll);
csvOrderRoute.get('/filename/:fileName', controller.getByFileName);
csvOrderRoute.get('/:id', controller.getById);
csvOrderRoute.put('/:id', controller.updateExecutionStatus);
exports.default = csvOrderRoute;
//# sourceMappingURL=csv-order.route.js.map