/**
 * @typedef IContent
 * @property { string } T - Trade - eg: Trade
 * @property { string } typeEX - typeEX - eg: SELL,BUY
 * @property { integer } buyMin - Minimum to buy
 * @property { integer } buyMax - Maximum to buy
 * @property { integer } qty - quantity
 * @property { integer } stop
 * @property { Array.<integer> } targets
 * @property { string } pair
 * @property { integer } step
 * @property { string } channel
 * @property { string } uniqueId
 * @property { string } type
 * @property { integer } price
 * @property { integer } timeIn
 * @property { integer } qtdTargets
 * @property { integer } initQty
 * @property { integer } priceOut
 * @property { integer } timeOut
 * @property { integer } fee
 * @property { integer } BTCSellQty
 * @property { integer } BTCBuyQty
 * @property { integer } sellQty
 */
export class IContent {
    BTCSellQty?:number;
    BTCBuyQty?:number;
    sellQty?:number;
    T?: string;
    typeEX?: string;
    buyMin?: string;
    buyMax?: string;
    qty?: number;
    stop?: string;
    targets?: number[];
    pair?: string;
    step?: number;
    channel?: string;
    uniqueId?: string;
    type?: string;
    price?: number;
    exId?: number;
    status?: string;
    priceIn?: number;
    timeIn?: number;
    qtdTagets?: number;
    initQty?: number;
    priceOut?: number;
    timeOut?: number;
    fee?: number;
}


