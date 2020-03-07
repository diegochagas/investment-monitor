import {ApplicationResponse} from "../../../shared/models/ApplicationResponse";
import {populate} from "../../../shared/helpers/populate";
import {SystemErrors} from "../../../shared/helpers/system-errors";
import * as mongoose from "mongoose";
import {InstanceType} from "typegoose";
import {IStrategy} from "../models/strategy/interfaces/IStrategy";
import {StrategyStatus} from "../models/strategy/enums/StrategyStatus";
import {InstanceSchema} from "../../commons/models/instance/Instance";
import {HeaderProject} from "../../../shared/models/enum/projectName";

export class ServiceStrategy<T extends IStrategy<any>, U> {

    constructor(private type: { new (): T }, private model: mongoose.Model<InstanceType<T>> & U & T) {
    }

    public async getHeaders() {
        try {
            const response = new this.type().getHeaders();
            return new ApplicationResponse(200, response);
        }catch(e) {
            if(e instanceof ApplicationResponse) {
                return e;
            }
            throw new ApplicationResponse(400, e, e.message);
        }
    }

    public async createStrategy(data: T, locals: any): Promise<ApplicationResponse<T>> {
        try {

            let strategy = populate(this.type, data);
            await strategy.assembleMockedValues(locals);

            const md5 = require('md5')(JSON.stringify(strategy.config));
            const findMd5 = await this.model.find({ md5 });

            if(findMd5.length > 0) {
                return new ApplicationResponse(400, findMd5[0], SystemErrors.STRATEGY_DUPLICATE_CONFIG.message, SystemErrors.STRATEGY_DUPLICATE_CONFIG.code);
            }

            // setting version
            strategy.config.strategy = { name: strategy.name, version: 1 };
            strategy.version = 1;
            const strategiesFound = await this.model.find({ name: strategy.name });
            if(strategiesFound.length > 0) {
                (strategy.config.strategy as any).version = strategiesFound.length + 1;
                strategy.version = strategiesFound.length + 1;
            }

            const response = await new this.model(strategy).save();
            return new ApplicationResponse(200, response);

        }catch(e) {
            if(e instanceof ApplicationResponse) {
                return e;
            }
            throw new ApplicationResponse(400, e, e.message);
        }
    }

    /**
     *
     * @param {string} status
     * @param {string} fields
     */
    public async getStrategies(status = StrategyStatus.ACTIVE, strategyType: string, fields?: string): Promise<ApplicationResponse<T[]>> {
        try {
            let filter = {};
            if(fields) {
                filter = fields.split(',').map(field => ({ [field]: 1 })).reduce((total, current) => ({...total, ...current}))
            }

            const strategies = await this.model.find({ status, strategyType: HeaderProject[strategyType] }, filter, {sort: { presentationName: 1 }});
            return new ApplicationResponse(200, strategies);
        } catch(err) {
            throw new ApplicationResponse(400, {}, 'Error to get Strategies')
        }
    }

    public async getStrategiesById(id: string): Promise<ApplicationResponse<any>> {
        try {
            const strategy = await this.model.findById(id).exec();
            return new ApplicationResponse<any>(200, strategy);
        } catch(err) {
            throw new ApplicationResponse(400, {}, 'Error to get Strategy');
        }
    }

    public async deleteStrategy(id: string): Promise<ApplicationResponse<any>> {
        try {
            await this.model.deleteOne({ _id: id });
            return new ApplicationResponse(200, {}, 'Delete complete');
        } catch(err) {
            throw new ApplicationResponse(400, {}, 'Error to delete Strategy');
        }
    }

    public async disableStrategy(id: string, user: any) {
        try {
            const updatedBy = user ? user.uid : "";
            //TODO essa chamada não deve ser feita por "import"
            const instance = await InstanceSchema.find({ strategy: id });

            if (instance.length > 0) {
                return new ApplicationResponse(400, instance[0], SystemErrors.STRATEGY_USED_STRATEGY.message, SystemErrors.STRATEGY_USED_STRATEGY.code);
            }

            await this.model.updateOne({ _id: id }, { status: StrategyStatus.INACTIVE, updatedBy});
            return new ApplicationResponse(200, {}, 'Strategy disabled');;

        } catch(err) {
            throw new ApplicationResponse(400, {}, 'unable to disable strategy');
        }
    }

    public async enableStrategy(id: string, user: any) {
        try {
            const updatedBy = user ? user.uid : "";
            await this.model.updateOne({ _id: id }, { status: StrategyStatus.ACTIVE, updatedBy });
            return new ApplicationResponse(200, {}, 'Strategy enabled');
        } catch(err) {
            throw new ApplicationResponse(400, {}, 'unable to enable strategy');
        }
    }
}
