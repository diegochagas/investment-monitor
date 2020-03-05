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
var controller = __importStar(require("../controllers/topic"));
var topicRoutes = express_1.default.Router();
/**
 * @route GET /topic
 * @group topic
 * @returns { Array.<Topic> } 200
 */
topicRoutes.route('/').get(controller.getTopics);
/**
 * @route POST /topic
 * @group topic
 * @param { Topic.model } topic.body.required
 * @returns { Topic.model } 200
 */
topicRoutes.route('/').post(controller.createTopic);
/**
 * @route PUT /topic/{id}
 * @group topic
 * @param { string } id.path.required
 * @param { Topic.model } topic.body.required
 * @returns { Topic.model } 200
 */
topicRoutes.route('/:id').put(controller.updateTopic);
/**
 * @route DELETE /topic/{id}
 * @group topic
 * @param { string } id.path.required
 * @returns { void } 200
 */
topicRoutes.route('/:id').delete(controller.deleteTopic);
/**
 * @route GET /topic/{id}
 * @group topic
 * @param { string } id.path.required
 * @returns { Topic.model } 200
 */
topicRoutes.route('/:id').get(controller.getTopicById);
exports.default = topicRoutes;
//# sourceMappingURL=topic.route.js.map