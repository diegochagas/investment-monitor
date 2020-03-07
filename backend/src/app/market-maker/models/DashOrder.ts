/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
*/
export default class DashOrder {
    constructor(
        public date?: string,
        public pair?: string,
        public type?: string,
        public orderPrice?: any,
        public orderAmount?: any,
        public avgTradingPrice?: any,
        public filled?: any,
        public total?: number,
        public status?: any,
        public quantity?: any,
        public exposition?: any,
        public boughtSold?: string,
        public purchasePrice?: any,
        public purchaseQuantity?: any,
        public avgPurchasePrice?: string | number,
        public salePrice?: any,
        public saleQuantity?: string | number,
        public avgSalePrice?: string | number,
        public avgPrice?: any,
        public deltaP?: number,
        public bought?: any,
        public sold?: number,
        public profitLoss?: number,
        public trade?: any,
        public profitLossAcum?: any,
        public instance?: string,
        public timestamp?: string
    ){}
}
