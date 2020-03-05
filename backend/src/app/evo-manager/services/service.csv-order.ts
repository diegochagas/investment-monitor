import {CsvOrder, CsvOrderSchema, ExecutiionStatus} from "../models/csv-order";
import {populate} from "../../../shared/helpers/populate";
import {handleValidateError} from "../../../shared/helpers/handleValitateError";
import {validate} from "class-validator";
import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import * as _ from 'lodash';
import logger from '../../../shared/middlewares/winston';

export class ServiceCsvOrder {

    static async save(data: { fileName: string, fileData: CsvOrder[] }): Promise<ApplicationResponse<any>> {

        const check = await CsvOrderSchema.find({ csvFileName: data.fileName.toUpperCase() }).exec();
        if(check.length > 0)
            throw new ApplicationResponse(409, {}, 'File name already exists');

        const csv = data.fileData.map(item => {
            item.csvFileName = data.fileName;
            return item;
        });

        const success: CsvOrder[] = [];
        const errors: { errors: any, fileIndex: number }[] = [];
        for(const [i, line] of csv.entries()) {
            try {
                const model = populate(CsvOrder, line);
                await handleValidateError(await validate(model));

                const data = await new CsvOrderSchema(model).save();
                success.push(data);

            }catch(e) {
                logger.error(`ServiceCsvOrder::save::Error - ${e.message}`);
                if(e instanceof ApplicationResponse)
                    errors.push({ errors: e.data, fileIndex: i })
                else throw new ApplicationResponse(400, e,'Error to save file');
            }
        }
        return new ApplicationResponse(200, { success, errors });
    }

    static async getAll(query: any): Promise<ApplicationResponse<any>> {
        try {
            let response: any = await CsvOrderSchema.find().exec();
            if(query.groupBy)
                response = _.groupBy(response, "csvFileName");
            return new ApplicationResponse(200, response);
        }catch(e) {
            logger.error(`ServiceCsvOrder::getAll::Error - ${e.message}`);
            throw new ApplicationResponse(400, {}, 'Error to get csv orders');
        }
    }

    static async getById(id: string): Promise<ApplicationResponse<CsvOrder>> {
        try {
            let response = await CsvOrderSchema.findById(id).exec();
            return new ApplicationResponse(200, response!);
        }catch(e) {
            logger.error(`ServiceCsvOrder::getById::Error - ${e.message}`);
            throw new ApplicationResponse(400, {}, 'Error to get order');
        }
    }

    static async getByFileName(fileName: string): Promise<ApplicationResponse<CsvOrder[]>> {
        try {
            let response: any = await CsvOrderSchema.find({ csvFileName: fileName.toUpperCase() }).exec();
            return new ApplicationResponse(200, response);
        }catch(e) {
            logger.error(`ServiceCsvOrder::getByFileName::Error - ${e.message}`);
            throw new ApplicationResponse(400, {}, 'Error to get order by file name');
        }
    }

    static async updateExecutionStatus (id: string, status: ExecutiionStatus): Promise<ApplicationResponse<CsvOrder>> {
        try {
            const response = await CsvOrderSchema.findOneAndUpdate({ _id: id }, { $push: { executionStatus: status } }, { new: true }).exec();
            return new ApplicationResponse(200, response!);
        } catch(e) {
            logger.error(`ServiceCsvOrder::updateExecutionStatus::Error - ${e.message}`);
            throw new ApplicationResponse(400, {}, 'Error to update order');
        }
    }
}
