"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (C) Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
*/
var DashOrder = /** @class */ (function () {
    function DashOrder(date, pair, type, orderPrice, orderAmount, avgTradingPrice, filled, total, status, quantity, exposition, boughtSold, purchasePrice, purchaseQuantity, avgPurchasePrice, salePrice, saleQuantity, avgSalePrice, avgPrice, deltaP, bought, sold, profitLoss, trade, profitLossAcum, instance, timestamp) {
        this.date = date;
        this.pair = pair;
        this.type = type;
        this.orderPrice = orderPrice;
        this.orderAmount = orderAmount;
        this.avgTradingPrice = avgTradingPrice;
        this.filled = filled;
        this.total = total;
        this.status = status;
        this.quantity = quantity;
        this.exposition = exposition;
        this.boughtSold = boughtSold;
        this.purchasePrice = purchasePrice;
        this.purchaseQuantity = purchaseQuantity;
        this.avgPurchasePrice = avgPurchasePrice;
        this.salePrice = salePrice;
        this.saleQuantity = saleQuantity;
        this.avgSalePrice = avgSalePrice;
        this.avgPrice = avgPrice;
        this.deltaP = deltaP;
        this.bought = bought;
        this.sold = sold;
        this.profitLoss = profitLoss;
        this.trade = trade;
        this.profitLossAcum = profitLossAcum;
        this.instance = instance;
        this.timestamp = timestamp;
    }
    return DashOrder;
}());
exports.default = DashOrder;
//# sourceMappingURL=DashOrder.js.map