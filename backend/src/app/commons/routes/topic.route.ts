import express from 'express';
import * as controller  from '../controllers/topic';
const topicRoutes = express.Router();

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

export default topicRoutes;
