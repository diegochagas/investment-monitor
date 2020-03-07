/**
 * @typedef OrderContent
 * @property { string } T
 * @property { string } type - Type - eg: BUY, SELL
 * @property { string } trend
 * @property { integer } price
 * @property { integer } qty
 * @property { integer } band
 * @property { integer } stop
 * @property { integer } lp
 * @property { integer } exId
 * @property { string } status
 * @property { integer } priceIn
 * @property { integer } timeIn
 * @property { integer } priceOut
 * @property { integer } timeOut
 */
export class OrderContent {

    T?: string;
    type?: string;
    trend?: string;
    price?: number;
    qty?: number;
    band?: number;
    stop?: number;
    lp?: number;
    exId?: number;
    status?: string;
    priceIn?: number;
    priceOut?: number;
    timeIn?: number;
    timeOut?: number;
}
