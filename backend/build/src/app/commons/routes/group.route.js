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
var controller = __importStar(require("../controllers/group"));
var express_1 = __importDefault(require("express"));
var groupRoutes = express_1.default.Router();
/**
 * @route POST /group
 * @group group
 * @param { Group.model } group.body.required
 * @returns { Group.model } 200
 */
groupRoutes.route('/').post(controller.createGroup);
/**
 * @route GET /group
 * @group group
 * @returns { Array.<Group> } 200
 *
 */
groupRoutes.route('/').get(controller.getGroups);
/**
 * @route GET /group/{id}
 * @group group
 * @param { string } id.path.required
 * @returns { Group.model } 200
 *
 */
groupRoutes.route('/:id').get(controller.getGroupById);
/**
 * @route PUT /group/{id}
 * @group group
 * @param { string } id.path.required
 * @param { Group.model } group.body.required
 * @returns { Group.model } 200
 *
 */
groupRoutes.route('/:id').put(controller.updateGroup);
/**
 * @route DELETE /group/{id}
 * @group group
 * @param { string } id.path.required
 * @returns { void } 200
 *
 */
groupRoutes.route('/:id').delete(controller.deleteGroup);
exports.default = groupRoutes;
//# sourceMappingURL=group.route.js.map