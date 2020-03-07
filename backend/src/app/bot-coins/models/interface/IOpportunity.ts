/**
 * @typedef Opportunity
 * @property { integer } expectedReturn
 * @property { integer } realiseReturn
 * @property { integer } maxQuantityPossible
 */
export class IOpportunity {
    expectedReturn?: number;
    realizedReturn?: number;
    maxQuantityPossible?: number;
}
