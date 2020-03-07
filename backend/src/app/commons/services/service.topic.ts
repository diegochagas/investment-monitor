import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import {Topic, TopicSchema} from "../models/topic/Topic";
import {populate} from "../../../shared/helpers/populate";
import {handleValidateError} from "../../../shared/helpers/handleValitateError";
import {validate} from "class-validator";

export class ServiceTopic {

    static async getTopics(): Promise<ApplicationResponse<Topic[]>> {
        try {
            const data = await TopicSchema.find({});
            return new ApplicationResponse<Topic[]>(200, data);
        } catch (e) {
            if (e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, {}, 'Error to get Topics')
        }
    }

    static async getTopicById(id: string): Promise<ApplicationResponse<Topic>> {
        try {
            const topic = await TopicSchema.findById(id).exec();
            return new ApplicationResponse(200, <Topic>topic);
        } catch (e) {
            if (e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, {}, 'Error to get Topic')
        }
    }

    static async createTopic(topic: Topic): Promise<ApplicationResponse<Topic>> {
        try {
            const model = populate(Topic, topic);
            await handleValidateError(await validate(model));

            const data = await new TopicSchema(model).save()
            return new ApplicationResponse<Topic>(200, data);

        } catch (e) {
            if (e instanceof ApplicationResponse)
                throw e;
            else if (e.name === 'MongoError')
                throw e;
            throw new ApplicationResponse(400, {}, 'Error to create Topic')
        }
    }

    static async updateTopic(_id: string, topic: Topic): Promise<ApplicationResponse<Topic>> {
        try {

            const model = populate(Topic, topic);
            await handleValidateError(await validate(model));
            const response = await TopicSchema.updateOne({_id}, model);
            return new ApplicationResponse(200, response)

        }catch(e) {
            if(e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, {}, 'Error to update Topic', )
        }
    }

    static async deleteTopic(_id: string): Promise<ApplicationResponse<any>> {
        try {
            await TopicSchema.deleteOne({_id});
            return new ApplicationResponse(200, {}, 'Topic deleted')
        }catch(e){
            if(e instanceof ApplicationResponse)
                throw e;
            throw new ApplicationResponse(400, {}, 'Error to delete Topic', )
        }
    }
}


