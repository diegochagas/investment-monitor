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
var controller = __importStar(require("../controllers/instance"));
var instanceRoutes = express_1.default.Router();
/**
 * @route GET /instance
 * @group exchange
 * @returns { Instance.model } 200
 *
 */
// GET all instances
instanceRoutes.route('/').get(controller.getInstances);
/**
 * @route POST /instance
 * @group instance
 * @param { Instance.model } exchange.body.required
 * @returns { Instance.model } 200
 */
// POST instance
instanceRoutes.route('/').post(controller.createInstance);
/**
 * @route PUT /instance/{id}
 * @group instance
 * @param { string } id.path.required
 * @param { Instance.model } instance.body.required
 * @returns { Instance.model } 200
 *
 */
// PUT instance
instanceRoutes.route('/:id').put(controller.produceInstanceStrategy);
/**
 * @route DELETE /instance/{id}
 * @group instance
 * @param { string } id.path.required
 * @returns { void } 200
 */
// DELETE instance
instanceRoutes.route('/:id').delete(controller.deleteInstance);
/**
 * @route PUT /instance/{id}/action
 * @group instance
 * @param { string } id.path.required
 * @param { string } action.body.required - Action - restart
 * @returns { void } 200
 *
 */
// Turn instance on/off
instanceRoutes.route('/:id/action').put(controller.produceInstanceStatus);
/**
 * @route POST /instance/refresh
 * @group instance
 * @returns { boolean } 200
 */
// Request instances status refresh
instanceRoutes.route('/refresh').post(controller.refreshInstances);
/**
 * @route GET /instance/refresh
 * @group instance
 * @returns { boolean } 200
 */
instanceRoutes.route('/status').get(controller.getStatusIntances);
exports.default = instanceRoutes;
//# sourceMappingURL=instance.route.js.map