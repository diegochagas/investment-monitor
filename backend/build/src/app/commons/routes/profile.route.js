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
var controller = __importStar(require("../controllers/profile"));
var express_1 = __importDefault(require("express"));
var profileRoute = express_1.default.Router();
/**
 * @route POST /profile
 * @group profile
 * @param { Profile.model } profile.body.required
 * @returns { Profile.model } 200
 */
profileRoute.route('/').post(controller.createProfile);
/**
 * @route PUT /profile
 * @group profile
 * @param { Profile.model } profile.body.required
 * @returns { Profile.model } 200
 */
profileRoute.route('/').put(controller.createProfile);
/**
 * @route GET /profile
 * @group profile
 * @returns { Array.<Profile> } 200
 */
profileRoute.route('/').get(controller.getProfiles);
/**
 * @route GET /profile/{id}
 * @group profile
 * @param { string } id.path.required
 * @returns { Profile.model } 200
 */
profileRoute.route('/:id').get(controller.getProfile);
exports.default = profileRoute;
//# sourceMappingURL=profile.route.js.map