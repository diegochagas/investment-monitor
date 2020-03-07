/**
 * @typedef Operation
 * @property { string } strategy
 * @property { string } guid
 * @property { string } status
 * @property { string } reason
 * @property { Opportunity.model } oportunity
 * @property { Request.model } requests
 */
export class IOperation {
    strategy?: string;
    guid?: string;
    status?: string;
    reason?: string;
    oportunity?: {};
    requests?: {};
    executed?: {};
}
