import {Group, GroupSchema} from "../models/group/Group";
import {populate} from "../../../shared/helpers/populate";
import {validate} from "class-validator";
import {handleValidateError} from "../../../shared/helpers/handleValitateError";
import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";

export class ServiceGroup {

    static async createGroup(group: Group): Promise<ApplicationResponse<Group>> {
        try {
            const model = populate(Group, group);
            await handleValidateError(await validate(model));

            const data = await new GroupSchema(model).save();
            return new ApplicationResponse<Group>(200, data)
        }catch(err) {
            if(err instanceof ApplicationResponse)
                throw err;
            throw new ApplicationResponse(400, {},'Error to save Group')
        }
    }

    static async getGroup(): Promise<ApplicationResponse<Group[]>> {
        try {
            const group = await GroupSchema.find({}).exec();
            return new ApplicationResponse(200,  group);
        }catch(err) {
            throw new ApplicationResponse(400, {}, 'Error to get Groups')
        }
    }

    static async getGroupById(id: string): Promise<ApplicationResponse<Group>> {
        try {
            const group = await GroupSchema.findById(id).exec();
            return new ApplicationResponse<any>(200, group);
        } catch(err) {
            throw new ApplicationResponse(400, {}, 'Error to get Group');
        }
    }

    static async updateGroup(_id: string, group: Group): Promise<ApplicationResponse<any>> {
        try {
            const model = populate(Group, group);
            await handleValidateError(await validate(model));
            const response = await GroupSchema.updateOne({_id}, model);
            return new ApplicationResponse(200, response);
        }catch(err) {
            if(err instanceof ApplicationResponse)
                throw err;
            throw new ApplicationResponse(400, {}, 'Error to update Group')
        }
    }

    static async deleteGroup(_id: string): Promise<ApplicationResponse<any>> {
        try {
            await GroupSchema.deleteOne({ _id }).exec();
            return new ApplicationResponse(200, {}, 'Group deleted');
        }catch(err) {
            throw new ApplicationResponse(400, {}, 'Error to delete Group');
        }
    };
}
