/**
 * @typedef Request
 * @property { string } snapshotType
 * @property { integer } snapshotTimeStamp
 * @property { integer } snapshotVersion
 * @property { integer } quantity
 * @property { integer } rate
 * @property { integer } fee
 * @property { integer } value
 * @property { integer } effectiveRate
 * @property { Wallet.model } wallet
 * @property { Market.model } market
 * @property { Annotation.model } annotations
 */
export class IRequest {
    snapshotType?: string;
    snapshotTimeStamp?: number;
    snapshotVersion?: number;
    quantity?: number;
    rate?: number;
    fee?: number;
    value?: number;
    effectiveRate?: number;
    wallet?: {};
    market?: {};
    annotations?: {};
}
