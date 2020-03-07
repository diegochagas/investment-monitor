import {StrategyStatus} from "../enums/StrategyStatus";

export interface IStrategy<T> {
    name?: string | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    status: StrategyStatus;
    config: T;
    version?: number | undefined;

    assembleMockedValues(locals: any):any
    getHeaders(): {[id: string]: string}[]
}
